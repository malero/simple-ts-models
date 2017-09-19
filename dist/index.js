"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field_1 = require("./fields/Field");
exports.field = Field_1.field;
var BooleanField_1 = require("./fields/BooleanField");
var EmailField_1 = require("./fields/EmailField");
var FloatField_1 = require("./fields/FloatField");
var PositiveNumberField_1 = require("./fields/PositiveNumberField");
var StringField_1 = require("./fields/StringField");
var DataModel_1 = require("./DataModel");
exports.DataModel = DataModel_1.DataModel;
var Model_1 = require("./Model");
exports.Model = Model_1.Model;
var Collection_1 = require("./Collection");
exports.Collection = Collection_1.Collection;
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