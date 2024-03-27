import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "@style/_BookTable.scss";
import { useBooks } from "@context/BooksContext";
import Loading from "@assets/loading.svg";

const BooksTable = () => {
  const [displayCount, setDisplayCount] = useState(4);
  const { books } = useBooks();
  const [search, setSearch] = useState("");
  const [isSearched, setIsSearched] = useState(false);

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

  const handleFilter = (item) => {
    const lowerCaseTitle = item.title.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();
    if (isSearched == true) {
      return lowerCaseTitle.includes(lowerCaseSearch);
    } else {
      return lowerCaseTitle.includes("");
    }
  };

  return (
    <div className="main">
      <div className="books-table">
        {!books && (
          <div className="timer-container">
            <img src={Loading} alt="Molim sacekajte..." />
          </div>
        )}

        {books
          ? books
              .slice(0, displayCount)
              .filter((item) => handleFilter(item))
              .map((item, idx) => {
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
