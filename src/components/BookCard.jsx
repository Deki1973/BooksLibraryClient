import "@style/_BookCard.scss";

//
import { useNavigate } from "react-router-dom";

const BookCard = ({ _id, title, author, description, image }) => {
  const navigate = useNavigate();

  
  const handleClick = () => {
    navigate(`/books/${_id}`);
  };
  return (
    <div className="book-card-container">
      <img src={image} alt="cover" onClick={handleClick} loading="lazy" />
      <h1>{title}</h1>
      <h3>{author}</h3>
    </div>
  );
};

export default BookCard;
