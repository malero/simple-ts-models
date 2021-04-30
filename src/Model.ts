import MessageList from "simple-ts-message-list";
import {ModelAbstract, ModelData} from "./ModelAbstract";


export class Model extends ModelAbstract {
    _errors!: MessageList;
    _hasErrors: boolean;

    constructor(data: ModelData | null | undefined = null) {
        super();
        const fields = this.__fields__.splice(0, this.__fields__.length);
        for(const field of fields) {
            (function(_self, field) {
                if(!_self['__'+field+'__'])
                    return;

                _self.__fields__.push(field);
                const _field = _self['__'+field+'__'],
                    fieldType = _field[0],
                    config = _field[1] || {};

                _self.createField(field, fieldType, config);
            })(this, field);
        }

        this._hasErrors = false;
        if (data)
            this.setData(data);
        this._lastData = this.getData();
        this._constructor();
    }

    _constructor() {}

    validate(): MessageList {
        this._hasErrors = false;
        this._errors = new MessageList;
        for(const field of this.getFields()) {
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
