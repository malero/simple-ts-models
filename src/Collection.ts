import {Model} from "./Model";
import {ModelData} from "./ModelAbstract";

export class Collection<T extends Model> extends Array<T> {
    getData: () => ModelData[] = (): ModelData[] => {
        // Returns an array of data from all of the models in the collection
        const data: ModelData[] = [];
        for(const item of this) {
            data.push(item.getData())
        }
        return data;
    };
}
