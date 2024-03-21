import { useParams } from "react-router-dom";
import { useBooks } from "@context/BooksContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";

const SingleBook = () => {
  let { id } = useParams();
  const { books, handleBooksChange } = useBooks();

  const navigate = useNavigate();
  //
  const { isSignedIn } = useSession();

  const handleDelete1 = async (id) => {
    console.log("brisanje knjige ciji je id: " + id);
    if (
      confirm("Warning! This operation cannot be undone!\nAre you sure?") ==
      true
    ) {
      try {
        //const res = await axios.delete(`http://localhost:5000/books/${id}`);
        const res = await axios.delete(
          `https://bookslibraryserver-production.up.railway.app/books/${id}`
        );
        console.log(res);
        if (res.status == 200) {
          alert("The book has been deleted.");
          handleBooksChange();
          navigate("/");
        } else {
          alert("Oops! Something went wrong.\nError: " + res);
        }
      } catch (error) {
        alert(error);
      }
    } else {
      return;
    }
  };

  const handleClickUpdate = (id, item) => {
    console.log("update..." + id);
    console.log(item.title);
    console.log(item.author);
    console.log(item.description);
    navigate(`/books/updateBook/${id}`);
  };

  return (
    <>
      {books
        .filter((item) => item?._id == id)
        .map((item, idx) => {
          return (
            <div className="single-book-2" key={idx}>
              <h1>{item.title}</h1>
              <h2>{item.author}</h2>
              <img src={item.image} alt={item.title} />
              <p>{item.description}</p>

              {/*<div className={`buttons`} style={{ display:isSignedIn==true?"flex":"none"}}>*/}
              <div
                className={`buttons`}
                style={{ display: isSignedIn == true ? "flex" : "none" }}
              >
                <button
                  onClick={() => {
                    handleDelete1(id);
                  }}
                >
                  Obrisi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClickUpdate(id, item);
                  }}
                >
                  Izmeni
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default SingleBook;
