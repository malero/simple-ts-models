import { Field } from "./Field";

export class PositiveIntegerField extends Field {
    set value(data:any) {
        const oldValue = this.value;
        if(data == null) {
            this._value = null;
            return;
        } else if(typeof(data) == 'string')
                data = parseInt(data);

        if(data <= 0)
            data = 0;
        this._value = data;
        this.trigger('change', {
            oldValue:oldValue,
            value:data
        });
    }

    get value() {
        return this._value;
    }
}
