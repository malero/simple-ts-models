import { Field } from "./Field";

export class FloatField extends Field {
    set value(data:any) {
        const oldValue = this.value;
        if(typeof(data) == 'string')
                data = parseFloat(data);

        if(typeof(data) == "number" && this.config.toFixed)
            data = parseFloat(data.toFixed(this.config.toFixed));

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
