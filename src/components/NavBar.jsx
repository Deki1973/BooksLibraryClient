import { useTheme } from "@context/ThemeContext";
//
import { Link } from "react-router-dom";
import sun from "@assets/sun.svg";
import night from "@assets/night.svg";

import "@style/_Navbar.scss";
import { useBooks } from "@context/BooksContext";
//
import { UserButton, useUser } from "@clerk/clerk-react";



const NavBar = () => {
  const { theme, changeTheme } = useTheme();
  const { setIsFormSubmitted } = useBooks();

  const handleClick = () => {
    setIsFormSubmitted(false);
  };

  const {user}=useUser();


  return (
    <div className="navbar">
      <div className="links">
        <Link to="/" onClick={handleClick}>
          Pocetna
        </Link>
        <Link to="/books/create">Dodaj knjigu</Link>
        <Link to="books/find">Nadji naslov</Link>
        <div className="sign-links">
        <Link to="/sign-in">Uloguj se</Link>
        <Link to="/sign-up">Registruj se</Link>
        </div>
      </div>
      {user && <p>Prijavljeni ste kao: {user?.fullName}</p>}
      
      <UserButton afterSignOutUrl="/" />

      <button onClick={changeTheme}>
        <div className="theme-image">
          {theme.name == "dark" ? (
            <img src={sun} alt="day" />
          ) : (
            <img src={night} alt="night" />
          )}
        </div>
      </button>
    </div>
  );
};

export default NavBar;
