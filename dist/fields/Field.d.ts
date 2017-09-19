import { EventDispatcher } from "simple-ts-event-dispatcher";
export declare function field(fieldType?: typeof Field, config?: {}): (target: any, key: string) => void;
export declare class Field extends EventDispatcher {
    model: any;
    _value: any;
    _errors: String[];
    config: any;
    constructor(model: any, value?: any, config?: Object);
    value: any;
    getData(): any;
    validate(): String[];
}
