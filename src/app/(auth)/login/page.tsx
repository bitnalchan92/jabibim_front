"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/features/auth/validations/auth";
import { toast } from "sonner";
import { authClient } from "@/features/auth/api/auth.client";
import { useAuthStore } from "@/features/auth/store/auth.store";
import Cookies from "js-cookie";
import type { z } from "zod";
import { Suspense, useEffect, useState } from "react";

type FormValues = z.infer<typeof loginSchema>;

function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { login: storeLogin } = useAuthStore();

	const message = searchParams.get("message");
	const form = useForm<FormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "front@test.com",
			password: "wnddkdhta21!",
			academyId: process.env.NEXT_PUBLIC_ACADEMY_ID,
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			const response = await authClient.login(data);

			// 리프레시 토큰만 쿠키에 저장
			Cookies.set("refreshToken", response.refreshToken, {
				path: "/",
				// secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				expires: 7,
				domain: process.env.NODE_ENV === "production" ? ".bibimfront.vercel.app" : "localhost",
			});

			storeLogin(response);
			router.push("/dashboard");
		} catch (error) {
			toast.error("로그인 실패");
			console.error(error);
		}
	};

	useEffect(() => {
		if (message) {
			toast.success(message);
		}
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>이메일</FormLabel>
								<FormControl>
									<Input {...field} placeholder="이메일을 입력하세요" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>비밀번호</FormLabel>
								<FormControl>
									<Input {...field} type="password" placeholder="비밀번호를 입력하세요" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? "처리 중..." : "로그인"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginForm />
		</Suspense>
	);
}
