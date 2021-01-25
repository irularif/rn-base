import { Model } from "libs/model/model";

export class Dashboard<T extends Model = any> extends Model<T> {
  loading = false;

  async load() {}
}
const DashboardStore = Dashboard.create({
  localStorage: true,
  storageName: "Dashboard",
});
export default DashboardStore;
