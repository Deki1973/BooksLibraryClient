import { useParams } from "react-router-dom";
import { useBooks } from "@context/BooksContext";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "@style/_UpdateBook.scss";

const UpdateBook = () => {
  let { id } = useParams();
  const { books } = useBooks();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { handleBooksChange } = useBooks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(id);
    const updatedBook = {
      title: title,
      author: author,
      description: description,
      image: image,
    };

    try {
      const res = await axios({
        method: "patch",
        //url: `http://localhost:5000/books/${id}`,
        url: `https://bookslibraryserver-production.up.railway.app/books/${id}`,
        data: updatedBook,
      });

      if (res.status == 200) {
        alert(res.data.message);
        handleBooksChange();
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      console.log("Oops! " + error);
    }
  };

  // setovanje inicijalnih podatka
  useEffect(() => {
    const singleBook = books.filter((item) => item?._id == id);
    console.log(singleBook);
    setTitle(singleBook[0].title);
    setAuthor(singleBook[0].author);
    setDescription(singleBook[0].description);
    setImage(singleBook[0].image);
  }, []);

  return (
    <>
      {books
        .filter((item) => item?._id == id)
        .map((item, idx) => {
          return (
            <div className="update-book" key={idx}>
              <h1>Azuriranje podataka:</h1>
              <p>id knjige: {id}</p>
              <form action="submit" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="inputTitle"
                  name="inputTitle"
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
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
                <br />

                <textarea
                  name="inputDescription"
                  id="inputDescription"
                  cols="30"
                  rows="10"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <br />
                <input
                  type="text"
                  id="inputImage"
                  name="inputImage"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                />
                <br />

                <button type="submit">Snimi promene</button>
              </form>

              <img src={item.image} alt={item.title} />
            </div>
          );
        })}
    </>
  );
};

export default UpdateBook;
