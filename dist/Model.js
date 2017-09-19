"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var simple_ts_message_list_1 = require("simple-ts-message-list");
var ModelAbstract_1 = require("./ModelAbstract");
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(data) {
        var _this = _super.call(this) || this;
        var fields = _this.__fields__.splice(0, _this.__fields__.length);
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            (function (_self, field) {
                if (!_self['__' + field + '__'])
                    return;
                _self.__fields__.push(field);
                var _field = _self['__' + field + '__'], fieldType = _field[0], config = _field[1] || {};
                _self.createField(field, fieldType, config);
            })(_this, field);
        }
        _this._hasErrors = false;
        _this.setData(data);
        _this._lastData = _this.getData();
        _this._constructor();
        return _this;
    }
    Model.prototype._constructor = function () { };
    Model.prototype.validate = function () {
        this._hasErrors = false;
        this._errors = new simple_ts_message_list_1.default;
        for (var _i = 0, _a = this.getFields(); _i < _a.length; _i++) {
            var field = _a[_i];
            var errors = this['__' + field].validate();
            if (errors.length > 0) {
                this._errors.add(field, errors, true);
                this._hasErrors = true;
            }
        }
        return this._errors;
    };
    Model.prototype.hasErrors = function () {
        this.validate();
        return this._hasErrors;
    };
    Object.defineProperty(Model.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    return Model;
}(ModelAbstract_1.ModelAbstract));
exports.Model = Model;
//# sourceMappingURL=Model.js.map