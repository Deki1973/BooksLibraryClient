import "@style/_FindBook.scss";
import axios from "axios";
import { useEffect } from "react";
import { useSingleBook } from "../context/SingleBookContext";


const FindBook = () => {

    const {singleBook,setTitleInput}=useSingleBook();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const bookTitle=e.target[0].value;
        console.log(bookTitle);
        try{

            setTitleInput(bookTitle);
            console.log(singleBook);
            /*
            alert(bookTitle);
            const res = await axios(
                {
                  method: "post",
                  url:  "http://localhost:5000/books/find",
                  data: {title:bookTitle},
                }
              );
    
                if(res.ok){
                    console.log(res.data)
    
                }
        */
        }catch(error){
            console.log(error);
        }
        
    }



    return ( 
    
        <div className="find-book-container">
            <h1>Nadji knjigu po naslovu</h1>
            <form action="submit" onSubmit={handleSubmit}>
            <input type="text" id="bookTitle" name="bookTitle" className="book-title"/>
            <button type="submit">NADJI</button>
            </form>
        </div>
    
     );
}
 
export default FindBook;