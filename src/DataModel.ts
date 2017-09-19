import {ModelAbstract} from "./ModelAbstract";

export default class DataModel extends ModelAbstract {
    bind(event: string, fct: (...args: any[]) => any, context?: any, once?: boolean): number {

        return super.bind(event, fct, context, once);
    }
}
