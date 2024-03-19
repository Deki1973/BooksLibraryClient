
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
//
import "@style/_BookTable.scss";
import { useBooks } from "@context/BooksContext";
import Search from "@components/Search";

const BooksTable = () => {


  // infinite scroll

  // ovde sam imao problem. ako je sirina kartica za knjigu bila takva da se iscrtaju tri elementa u redu
  // ne bi se pojavio vertikalni scrollbar.
  // eksperimentisanje sa scroll-y i poodesavanjem visine tabele za kartice i visine samih kartica za knjige nije dalo pozeljne rezultate
  // prevario sam logiku ga tako sto sam u useState() stavio 4 umesto originalnog 3
  //
  const [displayCount, setDisplayCount] = useState(4);
  const {books}=useBooks();
  const [search, setSearch]=useState("");
  const [isSearched,setIsSearched]=useState(false);

  // infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 100
    ) {
      setDisplayCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  console.log(search);
  var searchFilter="";
  const handleFilter=(item)=>{
    const lowerCaseTitle=item.title.toLowerCase();
    const lowerCaseSearch=search.toLowerCase();
    if(isSearched==true){
      return lowerCaseTitle.includes(lowerCaseSearch);
    }else{
      return lowerCaseTitle.includes("");
      
    }
  }

const handleOnChange=(e)=>{
  setIsSearched(false);
  setSearch(e.target.value);
  console.log(e.target.value);
  
}

const handleSearch=()=>{
  setIsSearched(true);
}

const onKeyDown=(e)=>{
  console.log(e.keyCode);
  if (e.keyCode==13){
    console.log("ENTER");
    handleSearch();
  }
}
  // rendering
  return (
    <div className="main">
    
    <div className="search-container">
    <Search value={search} onChange={(e)=>{handleOnChange(e)}} handleSearch={handleSearch} onKeyDown={(e)=>{onKeyDown(e);}} className="search-box" />
    </div>
    
    <div className="books-table">
      {!books && <div><h1>Molim sacekajte...</h1></div>}
      
      {books
        ? books.slice(0,displayCount).filter((item)=>handleFilter(item)).map((item, idx) => {
            return (
              <div key={idx} className="book-card">
                <BookCard
                  _id={item._id}
                  title={item.title}
                  author={item.author}
                  description={item.description}
                  image={item.image}
                />
              </div>
            );
          })
        : null}
        </div>
        </div>
  );
};

export default BooksTable;