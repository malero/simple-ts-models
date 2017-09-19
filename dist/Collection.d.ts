import { Model } from "./Model";
export declare class Collection<T extends Model> extends Array<T> {
    $injected: any;
    getData: () => any[];
}
