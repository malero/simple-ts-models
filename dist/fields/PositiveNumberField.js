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
        enumerable: true,
        configurable: true
    });
    return PositiveIntegerField;
}(Field_1.Field));
exports.PositiveIntegerField = PositiveIntegerField;
//# sourceMappingURL=PositiveNumberField.js.map