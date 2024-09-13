import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./i18n"; // Ensure this file correctly initializes i18n

// Ensure the element with id "root" exists in your HTML file
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" not found in the HTML.');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
