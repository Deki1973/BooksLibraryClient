import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BooksContext = createContext(null);

export const useBooks = () => {
  return useContext(BooksContext);
};



export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(null);
  // da korisnike ne mora da rucno refresnuje stranicu nakon dodavanje knjige
  // ako je dodata nova knjiga ili obrisana postojeca:
  const [isChanged, setIsChanged] = useState(false);
  const handleBooksChange=()=>{
    setIsChanged(!isChanged);

  }

  useEffect(() => {
    async function getAllBooks() {
      try {
        const response = await axios.get("http://localhost:5000/books");
        //console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBooks();
  }, [isChanged]);

  return (
    <BooksContext.Provider
      value={{ books, handleBooksChange }}
    >
      {children}
    </BooksContext.Provider>
  );
};
