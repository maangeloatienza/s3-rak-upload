const express = require('express');
const importer = require('anytv-node-importer');
const router = express.Router();

const __ = importer.dirloadSync(__dirname + '/../controllers/v1');


router.get ('/users',       __.userController.index);
router.get ('/users/:id',   __.userController.show);
router.post('/users',       __.userController.store);
router.put ('/users/:id',   __.userController.update);
router.delete ('/users/:id',   __.userController.remove);


module.exports = router;