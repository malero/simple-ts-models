import {EventDispatcher} from "simple-ts-event-dispatcher";
import {Field} from "./fields/Field";

export interface ModelData {
    [key: string]: any;
}

export abstract class ModelAbstract extends EventDispatcher {
    [key: string]: any;

    createField(field: string, fieldType = Field, config?: any) {
        config = config || {};
        const instance = new fieldType(this, config.default, config),
            propDesc = Object.getOwnPropertyDescriptor(this, field);
        this['__'+field] = instance;

        // property getter
        const fieldGetter = function() {
            return instance.value;
        };
        const getter = propDesc ? propDesc.get : fieldGetter,
            fieldSetter = function(newVal: any) {
                instance.value = newVal;
            },
            setter = propDesc ? propDesc.set : fieldSetter;

        // Delete the original property
        delete this[field];

        // Create new property with getter and setter
        Object.defineProperty(this, field, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });

        instance.bind('change', (values) => {
            this.trigger('change', field, values);
            this.trigger('change:' + field, values);
        });
        return instance;
    }
}
