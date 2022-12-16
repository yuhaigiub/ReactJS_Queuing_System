import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Authentication from "./app/AuthContext";

import store from "./app/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

let persistor = persistStore(store);

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Authentication>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Authentication>
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
