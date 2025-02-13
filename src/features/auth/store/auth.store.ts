import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { usePurchasedCourseStore } from '@/features/course/store/purchased-course.store'
import { useCartStore } from '@/features/cart/store/cart.store'

type AuthState = {
  user: {
    userId: string
    email: string
    roles: string[]
    academyId: string
  } | null
  tokens: {
    accessToken: string
    refreshToken: string
  } | null
  isAuthenticated: boolean
  login: (response: {
    userId: string
    email: string
    roles: string[]
    academyId: string
    accessToken: string
    refreshToken: string
  }) => void
  logout: () => void
  updateAccessToken: (newAccessToken: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,

      login: (response) => set({
        user: {
          userId: response.userId,
          email: response.email,
          roles: response.roles,
          academyId: response.academyId
        },
        tokens: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        isAuthenticated: true
      }),

      logout: () => {
        Cookies.remove('refreshToken', { path: '/' });
        Cookies.remove('accessToken', { path: '/' });
        set({ 
          user: null, 
          tokens: null, 
          isAuthenticated: false 
        });
        usePurchasedCourseStore.getState().setPurchasedCourses([]);
        useCartStore.getState().setCart({ items: [], totalPrice: 0, totalCount: 0 });
      },

      updateAccessToken: (newAccessToken: string) => {
        set((state) => ({
          ...state,
          tokens: {
            accessToken: newAccessToken,
            refreshToken: state.tokens?.refreshToken ?? '',
          }
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
) 