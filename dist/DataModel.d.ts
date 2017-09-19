import { ModelAbstract, ModelData } from "./ModelAbstract";
export declare class DataModel extends ModelAbstract {
    constructor(data: ModelData | string[]);
    setData(data: ModelData): void;
    bind(event: string, fct: (...args: any[]) => any, context?: any, once?: boolean): number;
}
