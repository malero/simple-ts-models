import { Field } from "./Field";
export declare class EmailField extends Field {
    _emailRegex: RegExp;
    validate(): String[];
}
