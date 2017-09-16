import {Model} from "./Model";

export class Collection<T extends Model> extends Array<T> {
    public $injected:any;

    getData: () => any[] = function(): any[] {
        // Returns an array of data from all of the models in the collection
        const data = [],
            items: Array<T> = this as Array<T>;
        for(const item of items) {
            data.push(item.getData())
        }
        return data;
    };
}
