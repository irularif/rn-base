import AppConfig from "app/config/app";
import api from "libs/utils/api";

const login = async (data: any) => {
  const params: any = {
    url: AppConfig.serverUrl + "login",
    method: "post",
    data,
  };
  const res: any = await api(params);

  if (typeof res === "object") {
    if (res.status === "success") {
      return res;
    } else {
      alert(res.message);
      return {};
    }
  } else {
    alert("Opss... Something wrong!");
  }
};

const SessionAPI = {
  login,
};

export default SessionAPI;
