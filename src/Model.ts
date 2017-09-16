import { EventDispatcher } from "simple-ts-event-dispatcher";
import MessageList from "simple-ts-message-list";
import {Field} from "./fields/Field";

export interface ModelData {
    [key: string]: any;
}

export class Model extends EventDispatcher {
    __fields__: string[];
    protected _lastData: any;
    _errors: MessageList;
    _hasErrors: boolean;

    constructor(data: ModelData) {
        super();
        for(const field of this.getFields()) {
            (function(_self, field) {
                if(!_self['__'+field+'__'])
                    return;

                const _field = _self['__'+field+'__'],
                    fieldType = _field[0],
                    config = _field[1] || {},
                    override = _field[2];

                const instance = new fieldType(_self, config.default, config);
                _self['__'+field] = instance;


                const propDesc = Object.getOwnPropertyDescriptor(_self, field);

                // property getter
                const fieldGetter = function() {
                    return instance.value;
                };
                const getter = propDesc ? propDesc.get : fieldGetter;

                // property setter
                const fieldSetter = function(newVal) {
                    instance.value = newVal;
                };
                const setter = propDesc ? propDesc.set : fieldSetter;

                // Delete the original property
                if(override) {
                    delete _self[field];
                } else {
                    delete _self['_'+field];

                    // Set up a setter/getter for _key on overrides
                    Object.defineProperty(_self, '_'+field, {
                        get: fieldGetter,
                        set: fieldSetter,
                        enumerable: true,
                        configurable: true
                    });
                }

                // Create new property with getter and setter
                Object.defineProperty(_self, field, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });

                instance.bind('change', (values) => {
                    _self.trigger('change', field, values);
                    _self.trigger('change:' + field, values);
                });
            })(this, field);
        }
        this._hasErrors = false;
        this.setData(data);
        this._lastData = this.getData();
        this._constructor();
    }

    _constructor() {}

    isModified() {
        const oData = this._lastData,
            nData = this.getData();
        for(const key of this.getFields()) {
            if(nData[key] != oData[key])
                return true;
        }
        return false;
    }

    setData(data: ModelData) {
        const _fields = this.getFields();
        for (const key in data) {
            if (_fields.indexOf(key) > -1) {
                this[key] = data[key];
            }
        }
    }

    /*
     * Revert data to the last setData() call. Useful for forms that edit a
     * list of items and then hit cancel rather than saving the list.
     */
    revert() {
        this.setData(this._lastData);
    }

    setLastData() {
        this._lastData = this.getData();
    }

    getData(): ModelData {
        const _data = {};
        for (const key of this.getFields()) {
            const field = this['__'+key];
            if(this[key] == null || !field)
                continue;

            _data[key] = field.getData();
        }
        return _data;
    }

    getFields(): string[] {
        return this.__fields__;
    }

    getField(field: string): Field {
        return this['__'+field];
    }

    bindToFields(event:string, fields:string[], callback) {
        for(const field of fields) {
            const _field = this['__'+ field];
            if(_field)
                _field.bind(event, callback);

        }
    }

    validate(): MessageList {
        this._hasErrors = false;
        this._errors = new MessageList;
        for(const field of this.getFields()) {
            if(!this['__'+field])
                continue;
            const errors = this['__'+field].validate();
            if(errors.length > 0) {
                this._errors.add(field, errors, true);
                this._hasErrors = true;
            }
        }
        return this._errors;
    }

    hasErrors(): boolean {
        this.validate();
        return this._hasErrors;
    }

    get errors(): MessageList {
        return this._errors;
    }
}
