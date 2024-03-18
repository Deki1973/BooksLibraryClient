
const handleSubmit=(e)=>{
    e.preventDefault();
    const bookTitle=e.target[0].value;
    console.log(bookTitle);
    
}
const FindBook = () => {
    return ( 
        <div className="find-book-container">
            <h1>Find Book</h1>
            <form action="submit" onSubmit={handleSubmit}>
            <input type="text" id="bookTitle" name="bookTitle" className="book-title"/>
            <button type="submit">FIND</button>
            </form>
        </div>
     );
}
 
export default FindBook;