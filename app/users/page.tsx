'use client';
import { useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = () => {
    const newUser = { id: Date.now(), name, email };
    setUsers([...users, newUser]);
    setName('');
    setEmail('');
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2" onClick={addUser}>
          Add User
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border p-2 mb-2 flex justify-between">
            <span>
              {user.name} ({user.email})
            </span>
            <button
              className="text-red-500"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
