import { EventDispatcher } from "simple-ts-event-dispatcher";
import { Field } from "./fields/Field";
export interface ModelData {
    [key: string]: any;
}
export declare abstract class ModelAbstract extends EventDispatcher {
    [key: string]: any;
    __fields__: string[];
    protected _lastData: any;
    constructor();
    createField(field: string, fieldType?: typeof Field, config?: any): Field;
    setData(data: ModelData): void;
    getData(): ModelData;
    getFields(): string[];
    getField(field: string): Field;
    bindToFields(event: string, fields: string[], callback: (...args: any[]) => any): void;
    setLastData(): void;
    revert(): void;
    isModified(): boolean;
}
