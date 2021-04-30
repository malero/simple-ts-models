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
exports.DataModel = void 0;
var ModelAbstract_1 = require("./ModelAbstract");
var DataModel = /** @class */ (function (_super) {
    __extends(DataModel, _super);
    function DataModel(data) {
        var _this = _super.call(this) || this;
        if (data instanceof Array) {
            _this.__fields__ = data;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var field = data_1[_i];
                _this.createField(field);
            }
        }
        else {
            _this.setData(data);
        }
        return _this;
    }
    DataModel.prototype.setData = function (data) {
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var field = _a[_i];
            if (this.__fields__.indexOf(field) == -1) {
                this.__fields__.push(field);
                this.createField(field);
            }
        }
        _super.prototype.setData.call(this, data);
    };
    DataModel.prototype.bind = function (event, fct, context, once) {
        if (event.indexOf('change:') == 0)
            this.createField(event.substr(7));
        return _super.prototype.bind.call(this, event, fct, context, once);
    };
    return DataModel;
}(ModelAbstract_1.ModelAbstract));
exports.DataModel = DataModel;
//# sourceMappingURL=DataModel.js.map