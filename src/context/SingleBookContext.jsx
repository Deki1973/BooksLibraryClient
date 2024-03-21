import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SingleBookContext = createContext(null);

export const useSingleBook = () => {
  return useContext(SingleBookContext);
};



export const SingleBookProvider = ({ children }) => {
  const [singleBook, setSingleBook] = useState(null);
  // da korisnike ne mora da rucno refresnuje stranicu nakon dodavanje knjige
  // ako je dodata nova knjiga ili obrisana postojeca:
 
 
  const [titleInput, setTitleInput]=useState("");

  useEffect(() => {
    async function getSingleBook() {
      try {

        if (titleInput!=""){
        const res = await axios(
          {
            method: "post",
            url:  "http://localhost:5000/books/find",
            data:{title:titleInput}
          }
        );
        setSingleBook(res.data);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    getSingleBook();
  }, [titleInput]);

  return (
    <SingleBookContext.Provider
      value={{singleBook,setTitleInput }}
    >
      {children}
    </SingleBookContext.Provider>
  );
};
