import { Field } from "./Field";

export class EmailField extends Field {
    _emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    validate() {
        super.validate();
        if(this._value != null && !this._emailRegex.test(this._value))
            this._errors.push('Please enter a valid email address');
        return this._errors;
    }
}
