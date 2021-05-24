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
  
  files.map(file=>{
    let fileName = `${file.destination}${file.filename}`
    if (  file.size > (1024*1024*10)  ){
      return Global.fail(res,{
        message : 'File is to large to upload.',
        context : 'FILE TOO LARGE'
      },500)
    }
    if (  file.mimetype === "application/pdf" ||
          file.mimetype === "application/msword" ||
          file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/pjpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "video/mp4" ||
          file.mimetype === "audio/mpeg"  ){
            fs.readFile(fileName, (err, data) => {
              if (err){
                Global.fail(res, { 
                    context : err
                }, 500);
              }
              
              let params = {
                  Bucket: bucket, 
                  Key: file.originalname, 
                  Body: data,
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
                      return Global.success(res, {
                        data : uploadData,
                        message:`File(s) uploaded successfully at ${process.env.AWS_BUCKET_NAME}`
                      }, 200);
                  }
                 }
                }).catch(function(s3Err) {
                  return Global.fail(res, {
                    message: FAILED_TO_CREATE,
                    context : s3Err
                  }, 500);
                });
              })
    }else {
      return Global.fail(res,{
        message : 'File type not supported!',
        context : 'NOT SUPPORTED'
      },500)
    }
    
  })

}

module.exports = {
  store
}