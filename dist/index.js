"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = exports.field = exports.Collection = exports.Model = exports.DataModel = void 0;
var Field_1 = require("./fields/Field");
Object.defineProperty(exports, "field", { enumerable: true, get: function () { return Field_1.field; } });
var BooleanField_1 = require("./fields/BooleanField");
var EmailField_1 = require("./fields/EmailField");
var FloatField_1 = require("./fields/FloatField");
var PositiveNumberField_1 = require("./fields/PositiveNumberField");
var StringField_1 = require("./fields/StringField");
var DataModel_1 = require("./DataModel");
Object.defineProperty(exports, "DataModel", { enumerable: true, get: function () { return DataModel_1.DataModel; } });
var Model_1 = require("./Model");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return Model_1.Model; } });
var Collection_1 = require("./Collection");
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return Collection_1.Collection; } });
var fields = {
    Field: Field_1.Field,
    BooleanField: BooleanField_1.BooleanField,
    EmailField: EmailField_1.EmailField,
    FloatField: FloatField_1.FloatField,
    PositiveIntegerField: PositiveNumberField_1.PositiveIntegerField,
    StringField: StringField_1.StringField
};
exports.fields = fields;
//# sourceMappingURL=index.js.map