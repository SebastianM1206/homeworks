import Person from "./person.js";

class ATMQueue {
  constructor() {
    this.queue = [];
  }

  // Add a person to the queue
  enqueue(person) {
    if (!(person instanceof Person)) {
      throw new Error("Invalid person instance");
    }
    this.queue.push(person);
  }

  // Remove and return the first person in line (FIFO)
  dequeue() {
    return this.queue.shift();
  }

  // Peek at the first person in line without removing them
  peek() {
    return this.queue.length > 0 ? this.queue[0] : null;
  }

  // Check if the queue is empty
  isEmpty() {
    return this.queue.length === 0;
  }

  // Get queue size
  size() {
    return this.queue.length;
  }

  // Get all people in the queue
  getPeople() {
    return this.queue;
  }
}

export default ATMQueue;
