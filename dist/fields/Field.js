"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = exports.field = void 0;
var simple_ts_event_dispatcher_1 = require("simple-ts-event-dispatcher");
function field(fieldType, config) {
    if (fieldType === void 0) { fieldType = Field; }
    if (config === void 0) { config = {}; }
    return function (target, key) {
        if (target.__fields__ == undefined) {
            target.__fields__ = [];
        }
        // Abstract models share __fields__
        if (target.__fields__.indexOf(key) == -1)
            target.__fields__.push(key);
        var getter = function () {
            return [fieldType, config];
        };
        Object.defineProperty(target, '__' + key + '__', {
            get: getter,
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
    };
}
exports.field = field;
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field(model, value, config) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.config = config;
        _this.value = value;
        _this._errors = [];
        return _this;
    }
    Object.defineProperty(Field.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            var oldValue = this._value;
            this._value = v;
            this.trigger('change', {
                oldValue: oldValue,
                value: v
            });
        },
        enumerable: false,
        configurable: true
    });
    Field.prototype.getData = function () {
        return this.value;
    };
    Field.prototype.validate = function () {
        this._errors = [];
        if (this.config['required'] == true && this._value == null)
            this._errors.push('This field is required.');
        return this._errors;
    };
    return Field;
}(simple_ts_event_dispatcher_1.EventDispatcher));
exports.Field = Field;
//# sourceMappingURL=Field.js.map