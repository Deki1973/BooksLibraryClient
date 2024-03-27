import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BooksProvider } from "./context/BooksContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { SingleBookProvider } from "./context/SingleBookContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SingleBookProvider>
        <BooksProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BooksProvider>
      </SingleBookProvider>
    </ClerkProvider>
  </Router>
);
