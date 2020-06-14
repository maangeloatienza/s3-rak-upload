'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Importer = function () {
    function Importer() {
        _classCallCheck(this, Importer);
    }

    /**
     * `require`s every module in the given array, returns an object where the required objects are attached
     * @param {array} modules - module paths
     * @param {object} attach - where the required files should be attached
     * @return {object} - required modules
     */


    _createClass(Importer, [{
        key: 'load',
        value: function load(modules) {
            var attach = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (!Array.isArray(modules)) {
                modules = [modules];
            }

            modules.forEach(function (a) {
                var varname = a.split('|');

                attach[varname[1] || a.split('/').pop()] = varname.length > 2 ? require(varname[0])() : require(varname[0]);
            });

            return attach;
        }

        /**
         * requires every js file inside the given folder, fires callback with 2 arguments, error and the object where the required objects are attached
         * @param {string} path - folder path
         * @param {function} callback - receives 2 arguments, error and object
         * @param {object} attach - where the required files should be attached
         * @return undefined
         */

    }, {
        key: 'dirload',
        value: function dirload(path, cb) {
            var imports = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


            function start() {
                path = path.replace(/\/$/, '');
                _fs2.default.readdir(path, require_all_js);
            }

            function require_all_js(err, files) {
                if (err) {
                    return cb(err);
                }

                files.forEach(function (file) {
                    var ext = file.split('.').slice(-1)[0];
                    if (!~['js', 'json'].indexOf(ext)) {
                        return;
                    }

                    file = file.replace('.' + ext, '');
                    imports[file] = require(path + '/' + file);
                });

                cb(null, imports);
            }

            start();
        }

        /**
         * Requires every js file inside the given folder, return object where the required objects are attached
         * @param {string} path - folder path
         * @param {object} attach - where the required files should be attached
         * @return {object}
         */

    }, {
        key: 'dirloadSync',
        value: function dirloadSync(path) {
            var attach = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            function start(_path, imports) {
                var files = _fs2.default.readdirSync(_path);
                var len = files.length;
                var file = void 0;

                while (len--) {
                    file = files[len];

                    var ext = file.split('.').slice(-1)[0];
                    if (!~['js', 'json'].indexOf(ext)) {
                        if (_fs2.default.statSync(_path + '/' + file).isDirectory()) {
                            imports[file] = {};
                            start(_path + '/' + file, imports[file]);
                        }

                        continue;
                    }

                    file = file.replace('.' + ext, '');
                    imports[file] = require(_path + '/' + file);
                }

                return imports;
            }

            return start(path.replace(/\/$/, ''), attach);
        }
    }]);

    return Importer;
}();

exports.default = Importer;