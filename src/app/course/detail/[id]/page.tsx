"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cartClient } from "@/features/cart/api/cart.client";
import { useCartStore } from "@/features/cart/store/cart.store";
import { courseClient } from "@/features/course/api/course.client";
import { usePurchasedCourseStore } from "@/features/course/store/purchased-course.store";
import { CourseDetail } from "@/features/course/types/course-types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function CourseDetailPage() {
	const { id } = useParams();
	const { tokens } = useAuthStore();
	const { getCourseDetail } = courseClient;
	const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { addToCart, getCart } = cartClient;
	const { getPurchasedCourses } = courseClient;
	const isPurchased = usePurchasedCourseStore((state) => state.isPurchased(id as string));

	useEffect(() => {
		async function fetchCourseDetail() {
			try {
				const response = await getCourseDetail(tokens?.accessToken as string, id as string);
				if (response) {
					setCourseDetail(response.courseDetail);
				}
			} catch (error) {
				console.error("강의 정보를 불러오는데 실패했습니다:", error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCourseDetail();
	}, []);

	useEffect(() => {
		async function fetchPurchasedCourses() {
			const response = await getPurchasedCourses(tokens?.accessToken as string);

			usePurchasedCourseStore.getState().setPurchasedCourses(response.purchasedCourseList);
		}
		fetchPurchasedCourses();
	}, []);

	if (isLoading) {
		return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
	}

	if (!courseDetail) {
		return (
			<div className="flex justify-center items-center min-h-screen">강의를 찾을 수 없습니다.</div>
		);
	}

	const handleAddToCart = async (courseDetail: CourseDetail) => {
		try {
			if (!tokens?.accessToken) {
				toast.error("로그인이 필요합니다");
				return;
			}

			await addToCart(tokens.accessToken, courseDetail.courseId);
			const response = await getCart({
				accessToken: tokens.accessToken,
			});

			if (response) {
				useCartStore.getState().setCart({
					items: response.items,
					totalPrice: response.totalPrice,
					totalCount: response.totalCount,
				});
				toast.success("장바구니에 추가되었습니다");
			}
		} catch (error) {
			console.error("장바구니 추가 실패:", error);
			toast.error("장바구니 추가에 실패했습니다");
		}
	};

	return (
		<>
			<Toaster richColors position="top-center" />
			<div className="container mx-auto px-4 pt-24 pb-12">
				<div className="max-w-5xl mx-auto">
					{/* 강의 기본 정보 */}
					<div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
						<div className="md:flex">
							{/* 강의 이미지 */}
							<div className="md:w-1/3">
								<div className="relative h-64 md:h-full">
									{courseDetail.courseProfilePath ? (
										<Image
											src={courseDetail.courseProfilePath}
											alt={courseDetail.courseName}
											fill
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-gray-200">
											<span className="text-gray-400">No Image</span>
										</div>
									)}
								</div>
							</div>

							{/* 강의 정보 */}
							<div className="md:w-2/3 p-6">
								<div className="flex items-center gap-2 mb-2">
									<span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
										{courseDetail.courseSubject}
									</span>
									<span className="bg-gray-100 px-2 py-1 rounded text-sm">
										{courseDetail.courseDiff}
									</span>
								</div>

								<h1 className="text-2xl font-bold mb-4">{courseDetail.courseName}</h1>
								<p className="text-gray-600 mb-4">{courseDetail.courseInfo}</p>

								<div className="flex items-center gap-4 mb-4">
									<div>
										<p className="text-sm text-gray-500">강사</p>
										<p className="font-medium">{courseDetail.teacherName}</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">총 강의 수</p>
										<p className="font-medium">{courseDetail.classCount}개</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">수강료</p>
										<p className="font-medium text-primary">
											₩{courseDetail.coursePrice.toLocaleString()}
										</p>
									</div>
								</div>
								{!isPurchased ? (
									<Button
										className="w-full md:w-auto"
										onClick={() => handleAddToCart(courseDetail)}
									>
										장바구니에 담기
									</Button>
								) : (
									<Button
										className="w-full md:w-auto"
										onClick={() => handleAddToCart(courseDetail)}
									>
										수강하기
									</Button>
								)}
							</div>
						</div>
					</div>

					{/* 강의 목차 */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-bold mb-4">강의 목차</h2>
						<div className="space-y-3">
							{courseDetail.classList.map((classItem, index) => (
								<div
									key={classItem.classId}
									className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
								>
									<div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
										<span className="text-primary font-medium">{index + 1}</span>
									</div>
									<div className="flex-grow">
										<h3 className="font-medium">{classItem.className}</h3>
										<p className="text-sm text-gray-500">{classItem.classContent}</p>
									</div>
									<div className="text-sm text-gray-500">{classItem.classType}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
