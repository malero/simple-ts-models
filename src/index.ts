import {Field, field} from "./fields/Field";
import {BooleanField} from "./fields/BooleanField";
import {EmailField} from "./fields/EmailField";
import {FloatField} from "./fields/FloatField";
import {PositiveIntegerField} from "./fields/PositiveNumberField";
import {StringField} from "./fields/StringField";

export {DataModel} from "./DataModel";
export {Model} from "./Model";
export {Collection} from "./Collection";
export {field};

const fields = {
    Field: Field,
    BooleanField: BooleanField,
    EmailField: EmailField,
    FloatField: FloatField,
    PositiveIntegerField: PositiveIntegerField,
    StringField: StringField
};
export {fields};
