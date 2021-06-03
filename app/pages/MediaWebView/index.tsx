import {Image, Screen, Spinner, TopBar, View, WebView} from 'libs/ui';
import {useNavigation, useRoute} from '@react-navigation/native';
import {get} from 'lodash';
import {observer} from 'mobx-react';
import React from 'react';
import {Dimensions} from 'react-native';
import useTheme from 'libs/hooks/useTheme';

export default observer(() => {
  const Theme = useTheme();
  const dim = Dimensions.get('window');
  const nav = useNavigation();
  const route = useRoute();
  const {data, onGoBack}: any = route.params || {};
  let zoom = 100;
  let source = data.source;
  let props = data.props || {};
  if (source.html) {
    source.html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 15px;">
          ${data.source.html}
        </body>
      </html>`;
  }
  const style = get(data, 'style', {});

  return (
    <Screen>
      <TopBar
        enableShadow={true}
        backButton={true}
        actionBackButton={() => {
          if (!!onGoBack) {
            onGoBack();
          } else {
            nav.goBack();
          }
        }}>
        {data.title}
      </TopBar>
      <WebView
        source={source}
        textZoom={zoom}
        style={{
          flex: 1,
          ...style,
        }}
        loadingImage={require('app/assets/images/splash.png')}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        sharedCookiesEnabled={true}
        renderLoading={() => {
          return (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('app/assets/images/splash.png')}
                style={{
                  width: dim.width,
                  height: dim.width / 2,
                  marginBottom: 20,
                }}></Image>
              <Spinner
                style={{
                  alignSelf: 'center',
                }}
                color={Theme.colors.primary}></Spinner>
            </View>
          );
        }}
        {...props}
      />
    </Screen>
  );
});
