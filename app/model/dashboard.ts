import { Model } from "libs/model/model";

export class Dashboard extends Model {
  loading = false;

  async load() {}
}
const DashboardStore = Dashboard.create({
  localStorage: true,
  storageName: "Dashboard",
});
export default DashboardStore;
