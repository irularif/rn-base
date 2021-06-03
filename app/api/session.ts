import AppConfig from 'app/config/app';
import api from 'libs/utils/api';
import {Alert} from 'react-native';

const login = async (data: any) => {
  const params: any = {
    url: AppConfig.serverUrl + 'login',
    method: 'post',
    data,
  };
  const res: any = await api(params);

  if (typeof res === 'object') {
    if (res.status === 'success') {
      return res;
    } else {
      Alert.alert('Alert', res.message);
      return {};
    }
  } else {
    Alert.alert('Alert', 'Opss... Something wrong!');
  }
};

const SessionAPI = {
  login,
};

export default SessionAPI;
