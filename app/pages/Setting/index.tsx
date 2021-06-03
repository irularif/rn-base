import {useNavigation} from '@react-navigation/native';
import config from 'app/config/app';
import SessionStore from 'app/model/session';
import Header from 'app/pages/Setting/Header';
import TopBar from 'app/ui/utils/TopBar';
import codePushOptions from 'libs/config/code-push';
import useTheme from 'libs/hooks/useTheme';
import {Button, Icon, Screen, ScrollView, Text, View} from 'libs/ui';
import {IIcon} from 'libs/ui/Icon';
import {action, runInAction} from 'mobx';
import {observer, useLocalObservable} from 'mobx-react';
import React from 'react';
import {Alert} from 'react-native';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import Update from './Update';

export default observer(() => {
  const Theme = useTheme();
  const nav = useNavigation();
  const meta = useLocalObservable(() => ({
    update: false,
    checkUpdate: false,
    progress: '',
  }));

  const handleUpdate = action(async () => {
    try {
      runInAction(() => (meta.checkUpdate = true));
      codePush
        .checkForUpdate(codePushOptions.deploymentKey)
        .then(update => {
          if (!update) {
            Alert.alert('Alert', 'Already updated.');
            runInAction(() => (meta.checkUpdate = false));
          } else {
            runInAction(() => (meta.update = true));
            update
              .download((progress: any) => {
                if (!!progress) {
                  let dl = (progress.receivedBytes / progress.totalBytes) * 100;
                  runInAction(() => (meta.progress = `(${dl.toFixed(1)}%)`));
                  if (dl == 100) {
                    runInAction(() => (meta.checkUpdate = false));
                    meta.checkUpdate = false;
                    setTimeout(() => {
                      codePush.restartApp();
                    }, 100);
                  }
                }
              })
              .catch(e => {
                runInAction(() => (meta.checkUpdate = false));
                console.log(e);
              });
          }
        })
        .catch(e => {
          runInAction(() => (meta.checkUpdate = false));
          console.log(e);
        });
    } catch (e) {
      runInAction(() => (meta.checkUpdate = false));
      // handle or log error
      console.log(e);
    }
  });
  const menu = [
    {
      label: 'Periksa pembaharuan aplikasi',
      action: handleUpdate,
      icon: {
        name: 'system-update',
        source: 'MaterialIcons',
      } as IIcon,
    },
    {
      label: 'Keluar',
      action: () => SessionStore.logout(),
      icon: {
        source: 'AntDesign',
        name: 'logout',
        size: 18,
      } as IIcon,
    },
  ];

  return (
    <Screen>
      <TopBar title="Pengaturan" backButton />
      <ScrollView>
        <Header />
        <View
          style={{
            flex: 1,
          }}>
          {menu.map((item, key) => {
            return (
              <Button
                key={key}
                mode={'clean'}
                style={{
                  paddingHorizontal: 10,
                  borderRadius: 0,
                  justifyContent: 'flex-start',
                  borderBottomWidth: 1,
                  borderColor: '#ccc',
                }}
                onPress={item.action}>
                <Icon
                  size={20}
                  color={Theme.colors.primary}
                  {...item.icon}></Icon>
                <Text
                  style={{
                    marginLeft: 10,
                  }}>
                  {item.label}
                </Text>
              </Button>
            );
          })}
        </View>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
            }}>
            {'©'} React Native Base
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}>
            v{DeviceInfo.getVersion()}
            {config.mode === 'production' ? '' : '-dev'}
          </Text>
        </View>
      </ScrollView>
      <Update meta={meta} />
    </Screen>
  );
});
