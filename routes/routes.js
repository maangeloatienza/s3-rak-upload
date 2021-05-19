const express = require('express');
const importer = require('anytv-node-importer');
const router = express.Router();
const multer = require('multer');


const authorization = require('./../middleware/authorization');
const __ = importer.dirloadSync(__dirname + '/../controllers/v1');
const upload = multer({ dest: 'uploads/' });

router.get ('/users',                       __.userController.index);
router.get ('/users/:id',                   __.userController.show);
router.post('/users',                       __.userController.store);
router.put ('/users/:id',   authorization,  __.userController.update);
router.delete('/users/:id', authorization,  __.userController.remove);

router.post('/login', __.authenticationController.login);

router.post('/s3-upload', upload.array('file'), __.s3UploadController.store);


module.exports = router;