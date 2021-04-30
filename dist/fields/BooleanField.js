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
exports.BooleanField = void 0;
var Field_1 = require("./Field");
var BooleanField = /** @class */ (function (_super) {
    __extends(BooleanField, _super);
    function BooleanField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BooleanField.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (data) {
            var oldValue = this.value;
            this._value = !!data;
            this.trigger('change', {
                oldValue: oldValue,
                value: data
            });
        },
        enumerable: false,
        configurable: true
    });
    return BooleanField;
}(Field_1.Field));
exports.BooleanField = BooleanField;
//# sourceMappingURL=BooleanField.js.map