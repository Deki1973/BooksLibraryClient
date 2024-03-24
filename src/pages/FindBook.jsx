import "@style/_FindBook.scss";
import { useEffect, useState } from "react";
import { useSingleBook } from "../context/SingleBookContext";
import BookCard from "../components/BookCard";

const FindBook = () => {
  const { singleBook, setTitleInput } = useSingleBook();
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(singleBook);
  }, [singleBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setTitleInput(text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="find-book-container">
      <h1>Nadji knjigu po naslovu</h1>
      <form action="submit" onSubmit={handleSubmit} className="find-book-form">
        <input
          type="text"
          id="bookTitle"
          name="bookTitle"
          className="book-title"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit" className="button-find">
          NADJI
        </button>
      </form>
      {singleBook != null && (
        <div className="book-card">
          <BookCard
            _id={singleBook?._id}
            title={singleBook?.title}
            author={singleBook?.author}
            description={singleBook?.description}
            image={singleBook?.image}
          />
        </div>
      )}
     
    </div>
  );
};

export default FindBook;
