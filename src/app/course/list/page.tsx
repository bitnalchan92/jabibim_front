"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { courseClient } from "@/features/course/api/course.client";
import type { CourseList, Course } from "@/features/course/types/course-types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePurchasedCourseStore } from "@/features/course/store/purchased-course.store";
export default function Course() {
	const { tokens } = useAuthStore();
	const { getCourseList } = courseClient;
	const [courseList, setCourseList] = useState<CourseList | null>(null);

	useEffect(() => {
		async function fetchCourseList() {
			const response = await getCourseList(tokens?.accessToken ?? "");
			setCourseList(response);
		}
		fetchCourseList();
	}, [tokens]);

	if (!courseList) {
		return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4 pt-24 pb-12">
			<h1 className="text-3xl font-bold mb-8">강의 목록</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{courseList.courseList.map((course) => (
					<div
						key={course.courseId}
						className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
					>
						{/* 강의 이미지 */}
						<div className="relative h-48 bg-gray-100">
							{course.courseProfilePath ? (
								<Image
									src={course.courseProfilePath}
									alt={course.courseName}
									fill
									className="object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-gray-200">
									<span className="text-gray-400">No Image</span>
								</div>
							)}
							<div className="absolute top-2 right-2">
								<span className="bg-primary px-2 py-1 rounded text-white text-sm">
									{course.courseDiff}
								</span>
							</div>
						</div>

						{/* 강의 정보 */}
						<div className="p-4">
							<h3 className="font-semibold text-lg mb-2">{course.courseName}</h3>
							<p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-2">
								{course.courseSubject}
							</p>
							<p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 line-clamp-2">
								{course.courseInfo}
							</p>

							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600 dark:text-dark-text-secondary">
										{course.teacherName} 강사
									</p>
									<p className="font-medium text-primary">₩{course.coursePrice.toLocaleString()}</p>
								</div>
								<Button variant="outline" size="sm" asChild>
									<Link href={`/course/detail/${course.courseId}`}>자세히 보기</Link>
								</Button>
							</div>

							<div className="mt-3 flex flex-wrap gap-2">
								{course.courseTag.split(",").map((tag, index) => (
									<span
										key={index}
										className="text-xs bg-dark-background text-gray-300 dark:text-gray-700 dark:bg-gray-300 px-2 py-1 rounded"
									>
										{tag.trim()}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
