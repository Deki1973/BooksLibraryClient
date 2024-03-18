//
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
//
import { useTheme } from "./context/ThemeContext.jsx";
import NavBar from "./components/NavBar.jsx";
import SingleBook from "./pages/SingleBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";
import FindBook from "./pages/FindBook.jsx";
//
import {
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

const App = () => {
  const { theme } = useTheme();

  return (
    <main id="main" style={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<SingleBook />} />

        <Route
          path="/books/create"
          element={
            <>
              <SignedIn>
                <CreateBook />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/books/updateBook/:id"
          element={
            <>
              <SignedIn>
                <UpdateBook />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/books/singleBook/" element={<SingleBook />} />

        <Route path="/books/find/" element={<FindBook />} />
        <Route path="/sign-in" element={<SignIn afterSignInUrl="/" />} />
        <Route path="/sign-up" element={<SignUp afterSignUpUrl="/" />} />
      </Routes>
    </main>
  );
};

export default App;
