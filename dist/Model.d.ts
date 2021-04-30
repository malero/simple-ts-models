import MessageList from "simple-ts-message-list";
import { ModelAbstract, ModelData } from "./ModelAbstract";
export declare class Model extends ModelAbstract {
    _errors: MessageList;
    _hasErrors: boolean;
    constructor(data?: ModelData | null | undefined);
    _constructor(): void;
    validate(): MessageList;
    hasErrors(): boolean;
    get errors(): MessageList;
}
