'use client';
import { useEffect, useRef } from 'react';
import axios from 'axios';

export default async function AuthSessionRefresher() {
  const hasRefreshToken = document.cookie.includes('refreshSession=');

  console.log('Refresh Session:', hasRefreshToken);

  const refreshInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshToken = async () => {
    try {
      const response = await axios.get('/api/refresh');
      if (response.status === 200) {
        console.log('Session refreshed successfully');
      } else {
        console.log('Failed to refresh session');
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  // useEffect(() => {

  //   refreshToken();

  // })[];

  return null;
}
