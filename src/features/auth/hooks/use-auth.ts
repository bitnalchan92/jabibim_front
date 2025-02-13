"use client";

import type { Credential } from "@/core/types/auth";
import { courseClient } from "@/features/course/api/course.client";
import { usePurchasedCourseStore } from "@/features/course/store/purchased-course.store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { authClient } from "../api/auth.client";
import { useAuthStore } from "../store/auth.store";


export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, tokens } = useAuthStore();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setPurchasedCourses = usePurchasedCourseStore((state) => state.setPurchasedCourses);

  const handleLogin = useCallback(async (credentials: Credential) => {
    try {
      // 1. 로그인 요청
      const response = await authClient.login(credentials);
      console.log("로그인 응답:", response); // 디버깅

      // 2. 로그인 상태 저장
      login(response);

      router.push('/dashboard');
    } catch (error) {
      console.error("로그인 처리 중 에러:", error);
      throw new Error('로그인 실패');
    }
  }, [login, setPurchasedCourses, router]);

  const handleLogout = useCallback(() => {
    logout();
    usePurchasedCourseStore.getState().setPurchasedCourses([]); // 직접 store 접근
    router.push('/login');
  }, [logout, router]);

  return {
    user: useAuthStore(state => state.user),
    isAuthenticated: useAuthStore(state => state.isAuthenticated),
    tokens: useAuthStore(state => state.tokens),
    login: handleLogin,
    logout: handleLogout
  };
}; 