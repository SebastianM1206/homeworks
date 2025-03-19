import { useState } from "react";
import Book from "../utils/book";
import BookStack from "../utils/bookstack";

export default function BookStackComponent() {
  const [bookStack] = useState(new BookStack());
  const [books, setBooks] = useState([]); //
  const [newBook, setNewBook] = useState({
    name: "",
    isbn: "",
    author: "",
    editorial: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Add book to stack
  const addBook = () => {
    if (
      !newBook.name || // if any of the fields is empty then alert the user
      !newBook.isbn ||
      !newBook.author ||
      !newBook.editorial
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const book = new Book(
      newBook.name,
      newBook.isbn,
      newBook.author,
      newBook.editorial
    );
    bookStack.push(book);
    setBooks([...bookStack.getBooks()]);
    setNewBook({ name: "", isbn: "", author: "", editorial: "" });
  };

  // Remove last book
  const removeBook = () => {
    if (bookStack.isEmpty()) {
      alert("The stack is empty.");
      return;
    }
    bookStack.pop();
    setBooks([...bookStack.getBooks()]);
  };

  return (
    <div className="w-lg   p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Welcome to my Book Stack! lil bro
      </h2>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={newBook.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={newBook.isbn}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="editorial"
          placeholder="Editorial"
          value={newBook.editorial}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>

      <div className="mb-4">
        {books.length > 0 ? (
          <div>
            <h3 className="font-semibold mb-2">Last book (Top Book):</h3>
            <p className="bg-white p-2 rounded shadow">
              {bookStack.peek().name} by {bookStack.peek().name}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No books in stack</p>
        )}
      </div>

      {/* Book List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Book Stack:</h3>
        <ul className="list-disc pl-4">
          {books.map((book, index) => (
            <li key={index} className="text-gray-700">
              {book.name} - {book.author}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={removeBook}
        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Remove Last Book
      </button>
    </div>
  );
}
