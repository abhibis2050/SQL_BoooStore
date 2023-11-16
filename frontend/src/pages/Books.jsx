import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books`);
        console.log(res);
        setBooks(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete=async(id)=>{
    try {
        console.log(id)
        const res = await axios.delete(`http://localhost:8800/books/${id}`);
        console.log(res);
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div>
      <h1>Your Book Shop</h1>
      <div className="books">
        {books?.map((singleBook) => {
          return (
            <div className="book" key={singleBook?.id}>
              {books.cover ? (
                <>
                  <img src={singleBook.cover} alt="" />
                </>
              ) : null}
              <h2>{singleBook.title}</h2>
              <p>{singleBook.description}</p>
              <span>{singleBook?.price}</span>
              <button className="delete" onClick={()=>{
                console.log("delete clicked")
                handleDelete(singleBook.id)
              }}>Delete</button>
              <button className="update">
                <Link to={`/update/${singleBook.id}`}>Update</Link>
              </button>
            </div>
          );
        })}
      </div>
      <button>
        <Link to="/add">Add New Book</Link>
      </button>
    </div>
  );
};

export default Books;
