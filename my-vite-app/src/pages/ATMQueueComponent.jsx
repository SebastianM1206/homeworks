import { useState, useEffect } from "react";
import Person from "../utils/person";
import ATMQueue from "../utils/atmQueue";

export default function ATMQueueComponent() {
  const [atmQueue] = useState(new ATMQueue());
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    withdrawalAmount: "",
  });

  // Mock Data
  const mockPeople = [
    new Person("Alice", 200),
    new Person("Bob", 150),
    new Person("Charlie", 300),
    new Person("David", 100),
    new Person("Emma", 250),
  ];

  // Load mock people when component mounts
  useEffect(() => {
    mockPeople.forEach((person) => atmQueue.enqueue(person));
    setPeople([...atmQueue.getPeople()]);
  }, [atmQueue]);

  // Handle input changes
  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  // Add person to queue
  const addPerson = () => {
    if (!newPerson.name || !newPerson.withdrawalAmount) {
      alert("Please fill in all fields.");
      return;
    }
    const person = new Person(
      newPerson.name,
      parseFloat(newPerson.withdrawalAmount)
    );
    atmQueue.enqueue(person);
    setPeople([...atmQueue.getPeople()]);
    setNewPerson({ name: "", withdrawalAmount: "" });
  };

  // Remove first person in line
  const removePerson = () => {
    if (atmQueue.isEmpty()) {
      alert("The queue is empty.");
      return;
    }
    atmQueue.dequeue();
    setPeople([...atmQueue.getPeople()]);
  };

  return (
    <div className="w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🏧 ATM Queue</h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Person's Name"
          value={newPerson.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="withdrawalAmount"
          placeholder="Withdrawal Amount"
          value={newPerson.withdrawalAmount}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          onClick={addPerson}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add to Queue
        </button>
      </div>

      <div className="mb-4">
        {people.length > 0 ? (
          <div>
            <h3 className="font-semibold mb-2">Next Person in Line:</h3>
            <p className="bg-white p-2 rounded shadow">
              {atmQueue.peek().name} - ${atmQueue.peek().withdrawalAmount}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No one in the queue</p>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">People in Queue:</h3>
        <ul className="list-disc pl-4">
          {people.map((person, index) => (
            <li key={index} className="text-gray-700">
              {person.name} - ${person.withdrawalAmount}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={removePerson}
        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Process First Person
      </button>
    </div>
  );
}
