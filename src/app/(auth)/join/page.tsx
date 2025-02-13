"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { SignupFormValues, signupSchema } from "@/features/auth/validations/auth";
import { toast } from "sonner";
import { authClient } from "@/features/auth/api/auth.client";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

// 폼 로직만 포함하는 클라이언트 컴포넌트
export default function JoinForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	type SignupForm = z.infer<typeof signupSchema>;

	const form = useForm<SignupForm>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			studentName: "",
			studentEmail: "",
			studentPassword: "",
			studentPhone: "",
			adsAgreed: false,
			academyId: "cd1918cc-820d-4ac8-be7c-c46a5f943047",
		},
	});

	const onSubmit = async (data: SignupForm) => {
		try {
			setIsLoading(true);

			if (!process.env.NEXT_PUBLIC_ACADEMY_ID) {
				throw new Error("학원 ID가 설정되지 않았습니다");
			}

			const response = await authClient.signup({
				studentName: data.studentName,
				studentEmail: data.studentEmail,
				studentPassword: data.studentPassword,
				studentPhone: data.studentPhone,
				academyId: process.env.NEXT_PUBLIC_ACADEMY_ID,
				adsAgreed: data.adsAgreed,
			});

			toast.success("회원가입이 완료되었습니다");
			router.push("/login?message=회원가입이_완료되었습니다");
		} catch (error) {
			console.error(error);
			toast.error(error instanceof Error ? error.message : "회원가입에 실패했습니다");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-700 px-4">
			<div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">회원가입</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						이미 계정이 있으신가요?{" "}
						<Link href="/login" className="text-blue-600 hover:text-blue-500">
							로그인
						</Link>
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
						<FormField
							control={form.control}
							name="studentName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>이름</FormLabel>
									<FormControl>
										<Input {...field} placeholder="이름을 입력하세요" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="studentEmail"
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
							name="studentPassword"
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

						<FormField
							control={form.control}
							name="studentPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>휴대폰 번호</FormLabel>
									<FormControl>
										<Input {...field} placeholder="010-0000-0000" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="adsAgreed"
							render={({ field }) => (
								<FormItem className="flex items-center space-x-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(checked: boolean) => field.onChange(checked)}
											className="h-4 w-4"
										/>
									</FormControl>

									<FormLabel className="!mt-0">광고 및 마케팅 수신 동의 (선택)</FormLabel>
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "처리 중..." : "회원가입"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
