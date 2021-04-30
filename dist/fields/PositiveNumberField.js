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
exports.PositiveIntegerField = void 0;
var Field_1 = require("./Field");
var PositiveIntegerField = /** @class */ (function (_super) {
    __extends(PositiveIntegerField, _super);
    function PositiveIntegerField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PositiveIntegerField.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (data) {
            var oldValue = this.value;
            if (data == null) {
                this._value = null;
                return;
            }
            else if (typeof (data) == 'string')
                data = parseInt(data);
            if (data <= 0)
                data = 0;
            this._value = data;
            this.trigger('change', {
                oldValue: oldValue,
                value: data
            });
        },
        enumerable: false,
        configurable: true
    });
    return PositiveIntegerField;
}(Field_1.Field));
exports.PositiveIntegerField = PositiveIntegerField;
//# sourceMappingURL=PositiveNumberField.js.map