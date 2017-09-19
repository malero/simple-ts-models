import {ModelAbstract, ModelData} from "./ModelAbstract";

export class DataModel extends ModelAbstract {
    constructor(data: ModelData | string[]) {
        super();
        if(data instanceof Array) {
            this.__fields__ = data;
            for (const field of data)
                this.createField(field);
        } else {
            this.setData(data);
        }
    }

    setData(data: ModelData) {
        for(const field of Object.keys(data))
            if(this.__fields__.indexOf(field) == -1) {
                this.__fields__.push(field);
                this.createField(field);
            }
        super.setData(data);
    }

    bind(event: string, fct: (...args: any[]) => any, context?: any, once?: boolean): number {
        if(event.indexOf('change:') == 0)
            this.createField(event.substr(7));
        return super.bind(event, fct, context, once);
    }
}
