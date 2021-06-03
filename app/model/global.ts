import { Model } from "libs/model/model";

export class Global extends Model {
  menuList: any[] = [];
  activeMenu = {
    label: "",
    path: "",
    icon: {},
  };
  expandMenu: boolean = false;
}
const GlobalStore = Global.create({
  localStorage: true,
  storageName: "Global",
});
export default GlobalStore;
