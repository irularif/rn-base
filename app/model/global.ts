import { Model } from "libs/model/model";

export class Global<T extends Model = any> extends Model<T> {
  menuList: any[] = [];
  activeMenu = {
    label: "",
    path: "",
  };
  expandMenu: boolean = false;
}
const GlobalStore = Global.create({
  localStorage: true,
  storageName: "Global",
});
export default GlobalStore;
