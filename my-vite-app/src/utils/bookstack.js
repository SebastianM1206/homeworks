import Book from "./book";

class BookStack {
  constructor() {
    this.stack = [];
  }

  // Push a book onto the stack
  push(book) {
    if (!(book instanceof Book)) {
      // Check if the book is an instance of Book
      throw new Error("Invalid book instance"); // Throw an error if it's not
    }
    this.stack.push(book);
  }

  // Pop the last book (LIFO)   last in, first out
  pop() {
    return this.stack.pop();
  }

  // Peek at the top book   (return the top book without removing it)
  peek() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.length === 0;
  }

  // Get stack size
  size() {
    return this.stack.length;
  }

  // Get all books
  getBooks() {
    return this.stack.slice().reverse();
  }
}

export default BookStack;
