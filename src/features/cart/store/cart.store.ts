import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { set, z } from 'zod';

// Zod 스키마 정의
const CartItemSchema = z.object({
  cartId: z.string(),
  courseName: z.string(),
  coursePrice: z.number(),
  courseProfilePath: z.string().url(),
  teacherName: z.string(),
  courseSubject: z.string(),
  courseDiff: z.string(),
  studentId: z.string().optional(),
});

type CartItem = z.infer<typeof CartItemSchema>;

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  isLoading: boolean;
  setCart: (data: { items: CartItem[], totalPrice: number, totalCount: number }) => void;
  checkoutItems: CartItem[];
  setCheckoutItems: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalPrice: 0,
      totalCount: 0,
      addItem: (item) => 
        set((state) => {
          const exists = state.items.some(i => i.cartId === item.cartId);
          if (exists) return state; // 이미 존재하면 상태 변경 없음
          return { items: [...state.items, item] };
        }),
      
      removeItem: (cartId) => 
        set((state) => ({
          items: state.items.filter(i => i.cartId !== cartId)
        })),

      clearCart: () => set({ items: [] }),

      isLoading: false,
      error: null,
      setCart: (data: { items: CartItem[], totalPrice: number, totalCount: number }) => set({ items: data.items, totalPrice: data.totalPrice, totalCount: data.totalCount }),

      checkoutItems: [],
      setCheckoutItems: (items: CartItem[]) => set({checkoutItems: items}),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export type { CartItem };