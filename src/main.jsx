import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

//redux store
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { autoLoginUserAction } from "./features/auth/authAction";

store.dispatch(autoLoginUserAction());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
