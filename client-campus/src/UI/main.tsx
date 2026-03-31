import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";

const oauthClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={oauthClientId}
    >
      <Provider store={store}>
        <PersistGate loading={<p>Cargando sesión...</p>} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
