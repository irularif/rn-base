import { Model } from "libs/model/model";

export class Cache extends Model {}
const CacheStore = Cache.create({ localStorage: true, storageName: "Cache" });
export default CacheStore;
