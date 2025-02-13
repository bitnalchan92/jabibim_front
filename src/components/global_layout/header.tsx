"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/api/auth.client";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { CartSheet } from "@/features/cart/components/cartSheet";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { useSafeTheme } from "../utils/theme";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { Pencil2Icon } from "@radix-ui/react-icons";

export default function Header() {
  const { theme } = useSafeTheme();
  const [mounted, setMounted] = useState(false);

  const { user, isAuthenticated, logout, tokens } = useAuthStore();
  const { logout: logoutApi } = authClient;
  const logosrc =
    theme === "dark" ? "/images/logo_gray.png" : "/images/logo_black.jpg";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className='w-full bg-background dark:bg-dark-background border-b h-16 flex items-center fixed top-0 z-50 shadow-sm'>
        <div className='container mx-auto px-4 flex items-center justify-between'>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='h-9 w-24' />
          <div className='flex items-center gap-6'>
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-20' />
          </div>
        </div>
      </header>
    );
  }

  const handleLogout = async () => {
    try {
      const token = tokens?.accessToken;
      if (token) {
        await logoutApi(token);
        await logout();
      }

			Cookies.remove("refreshToken", {
				path: "/",
				// secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				domain: process.env.NODE_ENV === "production" ? ".bibimfront.vercel.app" : "localhost",
			});
		} catch (error) {
			console.error(error);
		} finally {
			logout();
		}
	};

  return (
    <header className='w-full bg-background dark:bg-dark-background border-b h-16 flex items-center fixed top-0 z-50 shadow-sm'>
      <div className='container mx-auto px-4 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src={logosrc}
            alt='Code Craft'
            width={130}
            height={130}
            priority
          />
        </Link>

        <Link href='/course/list'>
          <Button asChild>
            <span>강의 목록</span>
          </Button>
        </Link>

        <div className='flex items-center gap-6'>
          {isAuthenticated && <CartSheet />}

          <ThemeToggle />

          <div className='flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <div className='relative inline-block group'>
                  {/* 기본 상태: 이메일 텍스트 */}
                  <div className='transition-opacity duration-300 group-hover:opacity-0'>
                    {user?.email} 님
                  </div>

                  {/* 호버 시 나타나는 버튼 */}
                  <Link href='/mypage'>
                    <button
                      className='absolute inset-0 transition-opacity duration-300 opacity-0
															group-hover:opacity-100 flex items-center justify-center pointer-events-none
															group-hover:pointer-events-auto hover:bg-gray-100
															dark:border-gray-600 dark:hover:bg-gray-700'
                    >
                      마이페이지
                      <Pencil2Icon className='w-5 h-5 text-gray-600 dark:text-gray-300' />
                    </button>
                  </Link>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleLogout}
                  className='hover:bg-gray-50 dark:hover:bg-gray-700'
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link href='/login'>로그인</Link>
                <Link href='/join'>회원가입</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
