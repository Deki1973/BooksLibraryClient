import { useState } from "react";
import "@style/_CreateBook.scss";
import axios from "axios";
//
import { useBooks } from "@context/BooksContext";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  //
  const { handleBooksChange } = useBooks();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      description,
      author,
      image,
    };
    console.log(newBook);
    const res = await axios({
      method: "post",
      //url:  "http://localhost:5000/books/create",
      url: "https://bookslibraryserver-production.up.railway.app/books/create",
      data: newBook,
    });
    //console.log(res);

    if (res.status == 201) {
      alert(res.data.message);
      resetForm();
      handleBooksChange();
    } else {
      console.log(res);
    }
  };

  /*
useEffect(
  ()=>{
    console.log(title);
  },[title]
);
*/
  return (
    <div className="create-book">
      <div className="add-form">
        Dodavanje nove knjige u tabelu:
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            id="inputTitle"
            name="inputTitle"
            placeholder="Naslov: "
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            id="inputAuthor"
            name="inputAuthor"
            placeholder="Ime autora: "
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <br />
          <textarea
            name="inputDescription"
            id="inputDescription"
            rows="10"
            placeholder="Opis: "
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <br />
          <input
            type="text"
            id="inputImgUrl"
            name="inputImgUrl"
            placeholder="URL za sliku: "
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <br />
          <div className="buttons-create">
            <button type="submit">POSALJI</button>

            <button
              onClick={(e) => {
                e.preventDefault();
                resetForm();
              }}
            >
              RESET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
