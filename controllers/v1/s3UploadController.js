const util = require('../../utils/util');
const Global = require('./../../global_functions');
const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const store =  (req,res,next) => {
  let uploadData = [];
  let files = req.files;
  let bucket =process.env.AWS_BUCKET_NAME;

  console.log(files)
  files.map(file=>{
    let fileName = `${file.destination}${file.filename}`
    if(file.size > (1024*1024*10)){
      Global.fail(res,{
        message : 'File is to large to upload.',
        context : 'FILE TOO LARGE'
      },500)
    }
    fs.readFile(fileName, (err, data) => {
    if (err){
      Global.fail(res, { 
          context : err
      }, 500);
    }
    console.log(data)
    let params = {
        Bucket: bucket, 
        Key: file.originalname, 
        Body: data,
        // Metadata: {
        //   'Content-Type': file.mimetype
        // }
        ContentType: file.mimetype
    };

    let putObjectPromise = s3.upload(params).promise();
      putObjectPromise.then(function(data) {
       if(data){
        uploadData.push({
          name : file.originalname,
          s3Res : data,
        })
        if(uploadData.length === files.length){
            Global.success(res, {
              data : uploadData,
              message:`File(s) uploaded successfully at ${process.env.AWS_BUCKET_NAME}`
            }, 200);
        }
       }
      }).catch(function(s3Err) {
        Global.fail(res, {
          message: FAILED_TO_CREATE,
          context : s3Err
        }, 500);
      });
    })
  })

}

module.exports = {
  store
}