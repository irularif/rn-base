import SessionAPI from "app/api/session";
import { Model } from "libs/model/model";
import { Alert } from "react-native";
import GlobalStore, { Global } from "./global";

export class User<T extends Model = any> extends Model<T> {
  id = null;
  nama = null;
}

export class Form extends User {
  saving = false;

  save() {
    return true;
  }
}
export class Role<T extends Model = any> extends Model<T> {
  id = null;
  role_name = "";
  role_desc = "";
}

export class Session<T extends Model = any> extends Model<T> {
  // required data
  isLoggedIn = false;

  form = Form.childOf(this);

  // optional data
  token = "";
  user = User.childOf(this);
  role = Role.childOf(this);
  roles: Role[] = [];
  setting = {
    description: "",
  };
  expired = null;

  username = "";
  password = "";
  loading = false;
  saveUserPass = false;

  // required func
  get AuthContext() {
    return {
      isLoggedIn: this.isLoggedIn,
      role: this.role.role_name,
    };
  }

  async login() {
    this._loadJSON({
      loading: true,
    });
    let saveUserPass: boolean = this.saveUserPass;
    if (!saveUserPass) {
      saveUserPass = await new Promise((resolve) => {
        Alert.alert(
          "Perhatian",
          "Apakah anda ingin menyimnpan username dan password?",
          [
            {
              text: "Simpan",
              onPress: () => {
                resolve(true);
              },
            },
            {
              text: "Tidak",
              onPress: () => {
                resolve(false);
              },
            },
          ]
        );
      });
    }
    const res = await SessionAPI.login({
      nis: this.username,
      password: this.password,
    });

    let data: any = {
      loading: false,
      saveUserPass,
    };
    if (!!res && !!res.token) {
      data = {
        ...data,
        ...res,
        role: {},
        isLoggedIn: true,
      };
    }
    if (!saveUserPass) {
      data = {
        ...data,
        username: "",
        password: "",
      };
    }

    let canLogin = true;
    if (!data.role || !data.token) {
      // alert("Maaf akun tidak bisa di gunakan pada applikasi ini.");
      canLogin = false;
    }
    if (!!canLogin) {
      this._loadJSON(data);
    } else {
      this.init();
    }
  }

  async logout() {
    let res = await new Promise((resolve) => {
      Alert.alert("Logout", "Are you sure?", [
        {
          text: "Cancel",
          onPress: () => resolve(false),
        },
        {
          text: "OK",
          onPress: () => resolve(true),
        },
      ]);
    });
    if (!!res) {
      let old = {};
      if (!!this.saveUserPass) {
        old = {
          username: this.username,
          password: this.password,
          saveUserPass: this.saveUserPass,
        };
      }
      let data = new Session()._loadJSON(old)._json;
      this._loadJSON(data);
      let global = new Global()._json;
      GlobalStore._loadJSON(global);
    }
  }

  // optional func
  init() {
    let old = {
      username: this.username,
      password: this.password,
      saveUserPass: this.saveUserPass,
    };
    let s = new Session()._loadJSON(old);
    this._loadJSON(s._json);
  }

  initForm() {
    this._loadJSON({
      form: this.user._json,
    });
  }
}

const SessionStore = Session.create({
  localStorage: true,
  storageName: "Session",
});
export default SessionStore;
