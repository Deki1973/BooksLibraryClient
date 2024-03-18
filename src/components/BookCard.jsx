// u radu sam koristio https://legacy.reactjs.org/docs/components-and-props.html
import "@style/_BookCard.scss";

//
import { useNavigate } from "react-router-dom";

const BookCard = ({ _id, title, author, description, image }) => {
  const navigate = useNavigate();

  // kada korisnik klikne na sliku knjige
  // treba da se prikaze stranica sa detaljnim opisom knjige

  const handleClick = () => {
    
    navigate(`/books/${_id}`);

  };
  return (
    <div className="book-card-container">
      <h1>{title}</h1>
      <h3>{author}</h3>
      <img src={image} alt="cover" onClick={handleClick} loading="lazy" />
      <br />
      <hr />
    </div>
  );
};

export default BookCard;