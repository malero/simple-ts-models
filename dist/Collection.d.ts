import { Model } from "./Model";
import { ModelData } from "./ModelAbstract";
export declare class Collection<T extends Model> extends Array<T> {
    getData: () => ModelData[];
}
