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
var EmailField = /** @class */ (function (_super) {
    __extends(EmailField, _super);
    function EmailField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return _this;
    }
    EmailField.prototype.validate = function () {
        _super.prototype.validate.call(this);
        if (this._value != null && !this._emailRegex.test(this._value))
            this._errors.push('Please enter a valid email address');
        return this._errors;
    };
    return EmailField;
}(Field_1.Field));
exports.EmailField = EmailField;
//# sourceMappingURL=EmailField.js.map