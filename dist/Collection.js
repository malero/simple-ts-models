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
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getData = function () {
            // Returns an array of data from all of the models in the collection
            var data = [], items = this;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                data.push(item.getData());
            }
            return data;
        };
        return _this;
    }
    return Collection;
}(Array));
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map