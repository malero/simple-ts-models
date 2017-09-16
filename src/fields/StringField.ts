import { Field } from "./Field";

export class StringField extends Field {
    set value(data:any) {
        var oldValue = this.value;
        this._value = ''+data;
        this.trigger('change', {
            oldValue:oldValue,
            value:data
        });
    }

    get value() {
        return this._value;
    }
}
