import Loading from "app/pages/Loading";
import { IRoute } from "libs/routes";
import PrivateService from "app/services/private-services";
import PublicService from "app/services/public-services";
import { AppProvider, CodePush } from "libs/ui";
import React, { useEffect, useState } from "react";
import SessionStore from "app/model/session";
import {
  PrivateInitialStack,
  PrivateRoutes,
  PublicInitialStack,
  PublicRoutes,
} from "app/routes";
import { observer } from "mobx-react";

const loadingComponent = (props: any) => {
  return <Loading {...props} />;
};

export default observer(() => {
  const [initialStack, setInitialStack] = useState({});
  const [routes, setRoutes] = useState([] as IRoute[]);

  useEffect(() => {
    const authContext = SessionStore.AuthContext;
    if (!!authContext && !!authContext.isLoggedIn) {
      let nroutes = PrivateRoutes;
      if (!!authContext.role) {
        const userRole = authContext.role;
        const filterRoutes = (item: IRoute) => {
          if (item.roles.length === 0) return true;
          return (
            item.roles
              .map((role) => role.toLowerCase())
              .findIndex((role) => role === userRole.toLowerCase()) > -1
          );
        };

        nroutes = PrivateRoutes.filter(filterRoutes);
      }
      setInitialStack(PrivateInitialStack);
      setRoutes(nroutes);
      PrivateService();
    } else {
      setInitialStack(PublicInitialStack);
      setRoutes(PublicRoutes);
      PublicService();
    }
  }, [SessionStore.AuthContext]);

  return (
    <CodePush LoadingComponent={loadingComponent}>
      <AppProvider
        LoadingComponent={loadingComponent}
        initialStack={initialStack}
        routes={routes}
        mode="default"
      />
    </CodePush>
  );
});
