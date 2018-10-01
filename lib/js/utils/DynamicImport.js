'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DynamicImport = function () {
    function DynamicImport() {
        _classCallCheck(this, DynamicImport);
    }

    _createClass(DynamicImport, null, [{
        key: 'Materialize',
        get: function get() {
            return new Promise(function (resolve) {
                import( /* webpackChunkName: "materialize" */'materialize-css').then(function (M) {
                    resolve(M);
                });
            });
        }
    }]);

    return DynamicImport;
}();

exports.default = DynamicImport;