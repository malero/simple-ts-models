import MessageList from "simple-ts-message-list";
import { ModelAbstract, ModelData } from "./ModelAbstract";
export declare class Model extends ModelAbstract {
    _errors: MessageList;
    _hasErrors: boolean;
    constructor(data: ModelData);
    _constructor(): void;
    validate(): MessageList;
    hasErrors(): boolean;
    readonly errors: MessageList;
}
