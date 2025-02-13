import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { PurchasedCourse } from '../types/course-types'


interface PurchasedCourseState {
  purchasedCourses: PurchasedCourse[]
  setPurchasedCourses: (courses: PurchasedCourse[]) => void
  isPurchased: (courseId: string) => boolean
}

export const usePurchasedCourseStore = create<PurchasedCourseState>()(
  persist(
    (set, get) => ({
      purchasedCourses: [],
      setPurchasedCourses: (courses:PurchasedCourse[]) => set({purchasedCourses: courses}),
      isPurchased: (courseId) => get().purchasedCourses.some(course => course.courseId === courseId),
    }),
    {
      name: 'purchased-courses',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
  