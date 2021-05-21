const express = require('express');
const importer = require('anytv-node-importer');
const router = express.Router();
const multer = require('multer');
const authorization = require('./../middleware/authorization');
const __ = importer.dirloadSync(__dirname + '/../controllers/v1');

const upload = multer(
  { 
    dest: 'uploads/',
    // limits: { 
    //   fileSize: 2 * 1024 * 1024 
    // },
    fileFilter : (req,file,cb)=>{
      if (file.mimetype !== "text/html" || file.mimetype !== "text/javascript" ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('File type not supported!'));
      }
    }
  });

  

router.get ('/users',                       __.userController.index);
router.get ('/users/:id',                   __.userController.show);
router.post('/users',                       __.userController.store);
router.put ('/users/:id',   authorization,  __.userController.update);
router.delete('/users/:id', authorization,  __.userController.remove);

router.post('/login', __.authenticationController.login);

router.post('/s3-upload/documents', upload.array('docs'), __.s3UploadController.store);
router.post('/s3-upload/graphic-materials', upload.array('materials'), __.s3UploadController.store);
router.post('/s3-upload/snapshots', upload.array('snapshots'), __.s3UploadController.store);


module.exports = router;