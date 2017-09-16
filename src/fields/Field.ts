import { EventDispatcher } from "simple-ts-event-dispatcher";

export function field(fieldType = Field, config = {}) {
    return function(target: any, key: string) {
        const _key = key;
        key = key[0] == '_' ? key.substr(1) : key;

        if(target.__fields__ == undefined) {
            target.__fields__ = [];
        }

        // Abstract models share __fields__
        if(target.__fields__.indexOf(key) == -1)
            target.__fields__.push(key);

        const getter = function() {
            return [fieldType, config, _key != key];
        };

        Object.defineProperty(target, '__'+key+'__', {
            get: getter,
            set: (v: any) => {},
            enumerable:false,
            configurable: true
        });
    }
}

export class Field extends EventDispatcher {
    model:any;
    _value:any;
    _errors:String[];
    config:any;

    constructor(model:any, value?:any, config?: Object) {
        super();
        this.model = model;
        this.config = config || {};
        this.value = value;
        this._errors = [];
    }

    set value(v:any) {
        const oldValue = this._value;
        this._value = v;
        this.trigger('change', {
            oldValue:oldValue,
            value:v
        });
    }

    get value() {
        return this._value;
    }

    getData() {
        return this.value;
    }

    getPostData() {
        return this.value;
    }

    validate() {
        this._errors = [];

        if(this.config['required'] == true && this._value == null)
            this._errors.push('This field is required.');

        return this._errors;
    }
    
    static getAngularDependencies(config:any):string[] {
        return [];
    }
}