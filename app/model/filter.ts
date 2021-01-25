import { Model } from "libs/model/model";

export class Filter<T extends Model = any> extends Model<T> {
  search = "";
  date = "";
  tab = "";
  showSearch = false;
}
