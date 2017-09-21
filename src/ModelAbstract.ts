import {EventDispatcher} from "simple-ts-event-dispatcher";
import {Field} from "./fields/Field";

export interface ModelData {
    [key: string]: any;
}

export abstract class ModelAbstract extends EventDispatcher {
    [key: string]: any;
    __fields__: string[];
    protected _lastData: any;

    constructor() {
        super();

        // Models may have __fields__ from prototype
        if(!this.__fields__)
            this.__fields__ = [];
    }

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

        instance.bind('change', (...args: any[]) => {
            this.trigger('change', field, ...args);
            this.trigger('change:' + field, ...args);
        });
        return instance;
    }

    setData(data: ModelData) {
        const fields = this.getFields();
        for (const key in data) {
            if (fields.indexOf(key) > -1) {
                this[key] = data[key];
            }
        }
    }

    getData(): ModelData {
        const data: ModelData = {};
        for (const key of this.getFields()) {
            const field = this['__'+key];
            if(this[key] == null || !field)
                continue;

            data[key] = field.getData();
        }
        return data;
    }

    getFields(): string[] {
        return this.__fields__;
    }

    getField(field: string): Field {
        return this['__'+field];
    }

    bindToFields(event:string, fields:string[], callback: (...args: any[]) => any) {
        for(const field of fields) {
            const _field = this['__'+ field];
            if(_field)
                _field.bind(event, callback);

        }
    }

    setLastData() {
        this._lastData = this.getData();
    }

    /*
     * Revert data to the last setData() call. Useful for forms that edit a
     * list of items and then hit cancel rather than saving the list.
     */
    revert() {
        this.setData(this._lastData);
    }

    isModified() {
        const oData = this._lastData,
            nData = this.getData();
        for(const key of this.getFields()) {
            if(nData[key] != oData[key])
                return true;
        }
        return false;
    }
}
