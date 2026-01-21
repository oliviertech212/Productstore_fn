'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initAuth } from '@/store/slices/authSlice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return <>{children}</>;
}