import { Model } from "libs/model/model";

export class Cache<T extends Model = any> extends Model<T> {}
const CacheStore = Cache.create({ localStorage: true, storageName: "Cache" });
export default CacheStore;
