import type { Detail } from '@/types/detail';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDetailStore = create<Detail>()(
  persist(
    (set) => ({
      pageTitle:    '',
      setPageTitle: (title) => set({ pageTitle: title }),
    }),
    { name: 'detail-storage' }
  )
);