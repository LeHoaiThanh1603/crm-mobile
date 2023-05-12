import { useState, useEffect } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';

export default function userdata() {
  const [users, setUsers] = useState([]);

  const updateUsers = () => {
    useFetch('/api/User/GetUser', 'GET', 'application/json', null, setUsers, (error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    updateUsers();
  }, []);

  return {
    users,
    updateUsers,
  };
}
