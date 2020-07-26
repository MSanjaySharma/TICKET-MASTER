import React from "react";
import ReactDOM from "react-dom";
import useDarkMode from "use-dark-mode";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";
import { store, persistor } from "./store/configureStore";
import themeDark from "./utils/functions/themeDark";
import themeLight from "./utils/functions/themeLight";
import Loader from "./utils/components/Loader";
import "./styles/globalStyles/link.css";

function MyApp() {
  const { value: isDark } = useDarkMode(true);

  /*   store.subscribe(() => {
    console.log(store.getState());
  }); */

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <ThemeProvider theme={isDark ? themeDark : themeLight}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

ReactDOM.render(<MyApp />, document.getElementById("root"));
