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
var simple_ts_event_dispatcher_1 = require("simple-ts-event-dispatcher");
var Field_1 = require("./fields/Field");
var ModelAbstract = /** @class */ (function (_super) {
    __extends(ModelAbstract, _super);
    function ModelAbstract() {
        var _this = _super.call(this) || this;
        // Models may have __fields__ from prototype
        if (!_this.__fields__)
            _this.__fields__ = [];
        return _this;
    }
    ModelAbstract.prototype.createField = function (field, fieldType, config) {
        var _this = this;
        if (fieldType === void 0) { fieldType = Field_1.Field; }
        config = config || {};
        var instance = new fieldType(this, config.default, config), propDesc = Object.getOwnPropertyDescriptor(this, field);
        this['__' + field] = instance;
        // property getter
        var fieldGetter = function () {
            return instance.value;
        };
        var getter = propDesc ? propDesc.get : fieldGetter, fieldSetter = function (newVal) {
            instance.value = newVal;
        }, setter = propDesc ? propDesc.set : fieldSetter;
        // Delete the original property
        delete this[field];
        // Create new property with getter and setter
        Object.defineProperty(this, field, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
        instance.bind('change', function (values) {
            _this.trigger('change', field, values);
            _this.trigger('change:' + field, values);
        });
        return instance;
    };
    ModelAbstract.prototype.setData = function (data) {
        var fields = this.getFields();
        for (var key in data) {
            if (fields.indexOf(key) > -1) {
                this[key] = data[key];
            }
        }
    };
    ModelAbstract.prototype.getData = function () {
        var data = {};
        for (var _i = 0, _a = this.getFields(); _i < _a.length; _i++) {
            var key = _a[_i];
            var field = this['__' + key];
            if (this[key] == null || !field)
                continue;
            data[key] = field.getData();
        }
        return data;
    };
    ModelAbstract.prototype.getFields = function () {
        return this.__fields__;
    };
    ModelAbstract.prototype.getField = function (field) {
        return this['__' + field];
    };
    ModelAbstract.prototype.bindToFields = function (event, fields, callback) {
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            var _field = this['__' + field];
            if (_field)
                _field.bind(event, callback);
        }
    };
    ModelAbstract.prototype.setLastData = function () {
        this._lastData = this.getData();
    };
    /*
     * Revert data to the last setData() call. Useful for forms that edit a
     * list of items and then hit cancel rather than saving the list.
     */
    ModelAbstract.prototype.revert = function () {
        this.setData(this._lastData);
    };
    ModelAbstract.prototype.isModified = function () {
        var oData = this._lastData, nData = this.getData();
        for (var _i = 0, _a = this.getFields(); _i < _a.length; _i++) {
            var key = _a[_i];
            if (nData[key] != oData[key])
                return true;
        }
        return false;
    };
    return ModelAbstract;
}(simple_ts_event_dispatcher_1.EventDispatcher));
exports.ModelAbstract = ModelAbstract;
//# sourceMappingURL=ModelAbstract.js.map