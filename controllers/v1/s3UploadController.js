const util = require('../../utils/util');
const Global = require('./../../global_functions');
const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const store = (req,res,next) => {
  let uploadData = [];

  const readUpload =  (file,fileName)=>{
    fs.readFile(fileName, (err, data) => {
    
      if (err){
        Global.fail(res, { 
            context : err
        }, 500);
      }
      let params = {
          Bucket: process.env.AWS_BUCKET_NAME, 
          Key: file.originalname, 
          Body: JSON.stringify(data, null, 2)
      };
      s3.upload(params, function(s3Err, data) {
          if (s3Err){
            Global.fail(res, {
                message: FAILED_TO_CREATE,
                context : s3Err
            }, 500);
          }
          if(data){
            uploadData.push({
              name : file.originalname,
              link : `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`
            })
            if(uploadData.length === req.files.length){
                Global.success(res, {
                  data : uploadData,
                  message:`File(s) uploaded successfully at ${process.env.AWS_BUCKET_NAME}`
                }, 200);
            }
          }
          
      });
    });
  }


  for(let i = 0; i < req.files.length;i++){
    let fileName = `${req.files[i].destination}${req.files[i].filename}`
    readUpload(req.files[i],fileName);
  }

}

module.exports = {
  store
}