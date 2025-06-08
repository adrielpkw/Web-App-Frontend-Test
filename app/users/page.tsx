'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';

const USERS_KEY = 'userList';

export default function UsersPage() {
  const [users, setUsers] = useState<string[]>([]);
  const [newUser, setNewUser] = useState('');
  const router = useRouter();

  // Check auth and load users from localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const defaultUsers = ['Alice', 'Bob'];
      setUsers(defaultUsers);
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  }, []);

  const updateStorage = (updatedUsers: string[]) => {
    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  };

  const addUser = () => {
    if (newUser.trim()) {
      const updated = [...users, newUser];
      updateStorage(updated);
      setNewUser('');
    }
  };

  const removeUser = (index: number) => {
    const updated = users.filter((_, i) => i !== index);
    updateStorage(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.replace('/login');
  };

  return (
    <ProtectedRoute>
    <main className="p-8 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button onClick={handleLogout} className="text-red-500">Logout</button>
      </div>

      <div className="flex mb-4">
        <input
          className="border p-2 w-full"
          placeholder="New user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={addUser} className="ml-2 px-4 py-2 bg-green-600 text-white rounded">
          Add
        </button>
      </div>

      <ul>
        {users.map((user, i) => (
          <li key={i} className="flex justify-between items-center border-b py-2">
            <span>{user}</span>
            <button onClick={() => removeUser(i)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </main>
    </ProtectedRoute>

  );
}
