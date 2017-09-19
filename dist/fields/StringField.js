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
var StringField = /** @class */ (function (_super) {
    __extends(StringField, _super);
    function StringField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StringField.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (data) {
            var oldValue = this.value;
            this._value = '' + data;
            this.trigger('change', {
                oldValue: oldValue,
                value: data
            });
        },
        enumerable: true,
        configurable: true
    });
    return StringField;
}(Field_1.Field));
exports.StringField = StringField;
//# sourceMappingURL=StringField.js.map