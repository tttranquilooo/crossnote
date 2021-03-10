import React, { useEffect, FC } from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import * as qs from "qs";
import { Router, Route, Switch } from "react-router-dom";
import { browserHistory } from "./utilities/history";
import { Home } from "./pages/Home";
import "./editor";
import { HomeSection } from "./containers/crossnote";
import { SettingsContainer } from "./containers/settings";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
// @ts-ignore
import PWAPrompt from "react-ios-pwa-prompt";
import { useTranslation } from "react-i18next";
const is = require("is_js");

const App: FC = () => {
  const { t } = useTranslation();
  const settingsContainer = SettingsContainer.useContainer();
  useEffect(() => {
    const handler = (event: any) => {
      try {
        event.preventDefault();
        event.prompt();
        event.userChoice.then((choiceResult: any) => {
          console.log(choiceResult);
        });
      } catch (error) {
        console.log(error);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);
  return (
    <ThemeProvider theme={settingsContainer.theme.muiTheme}>
      <div className="App">
        <Router history={browserHistory}>
          <Switch>
            <Route
              path={`/settings`}
              exact={true}
              render={(props) => (
                <Home section={HomeSection.Settings} queryParams={{}}></Home>
              )}
            ></Route>
            <Route
              path={`/notifications`}
              exact={true}
              render={(props) => (
                <Home
                  section={HomeSection.Notifications}
                  queryParams={{}}
                ></Home>
              )}
            ></Route>
            <Route
              path={`/privacy`}
              exact={true}
              render={(props) => (
                <Home section={HomeSection.Privacy} queryParams={{}}></Home>
              )}
            ></Route>
            <Route
              path={`/`}
              render={(props) => (
                <Home
                  section={HomeSection.Notebooks}
                  queryParams={qs.parse(
                    props.location.search.replace(/^\?/, ""),
                  )}
                ></Home>
              )}
            ></Route>
          </Switch>
        </Router>
        <ServiceWorkerWrapper></ServiceWorkerWrapper>
        {is.safari() ? (
          <PWAPrompt
            copyTitle={t("react-ios-pwa-prompt/copy-title")}
            copyBody={t("react-ios-pwa-prompt/copy-body")}
            copyShareButtonLabel={t(
              "react-ios-pwa-prompt/copy-share-button-label",
            )}
            copyAddHomeButtonLabel={t(
              "react-ios-pwa-prompt/copy-add-home-button-label",
            )}
            copyClosePrompt={t("general/cancel")}
          ></PWAPrompt>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default App;
