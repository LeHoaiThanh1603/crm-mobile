import { useState, useEffect } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';

export default function guestdata() {
  const [ guest, setGuest ] = useState([]);

  const updateGuest = () => {
    useFetch(
      '/api/Guest/GetGuest',
      'GET',
      '',
      null,
      setGuest,
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    updateGuest();
  }, []);

  return {
    guest,
    updateGuest
  };
}
