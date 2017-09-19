import { Field } from "./Field";

export class BooleanField extends Field {
    set value(data:any) {
        const oldValue = this.value;
        this._value = !!data;
        this.trigger('change', {
            oldValue:oldValue,
            value:data
        });
    }

    get value() {
        return this._value;
    }
}
