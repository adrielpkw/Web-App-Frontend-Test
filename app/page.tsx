'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      router.push('/users');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null; // or a loading spinner if you want
}
