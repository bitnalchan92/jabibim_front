"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartItemList } from "./CartItemList";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cartClient } from "../api/cart.client";
import { useCartStore } from "../store/cart.store";
import { Skeleton } from "@/components/ui/skeleton";
import PortOne, { PaymentRequest } from "@portone/browser-sdk/v2";
import apiClient from "@/lib/api-client";
export function CartSheet() {
	const { user, tokens, isAuthenticated } = useAuthStore();
	const { items, isLoading, totalCount, totalPrice, setCart, setCheckoutItems } = useCartStore();
	const router = useRouter();

	const checkoutHandler = async () => {
		if (!isAuthenticated || !tokens || !user) {
			return;
		}

		const addOrder = async () => {
			const response = await apiClient.post("/api/public/addOrder", {
				academyId: user.academyId,
				studentId: user.userId,
			});

			if (response.status !== 200) {
				return alert("주문 생성 실패");
			}

			return response.data.paymentId;
		};

		const paymentId = await addOrder();

		let paymentData: PaymentRequest = {
			storeId: "store-c4bc29a5-f169-45ae-a053-34c7c2332ccb",
			paymentId: paymentId,
			orderName: items.map((item) => item.courseName).join(", "),
			totalAmount: totalPrice,
			currency: "CURRENCY_KRW", // 필수 필드 추가
			channelKey: "channel-key-80de867c-23da-4dbb-8860-ecdce8c51f03",
			payMethod: "CARD",
			noticeUrls: [process.env.NEXT_PUBLIC_API_BASE_URL + "/api/webhook/payments/receive"],
		};

		PortOne.requestPayment(paymentData).then(async (response) => {
			console.log(response);
			if (response?.code !== undefined) {
				return alert("결제 실패");
			}
			const paymentCheckResponse = await apiClient.post("/api/public/paycheck", {
				paymentId: response?.paymentId,
				studentId: user.userId,
				academyId: user.academyId,
			});

			if (paymentCheckResponse.status !== 200) {
				return alert("결제 확인 실패");
			}

			console.log(paymentCheckResponse);

			alert("결제 완료, 대시보드로 이동합니다.");

			router.push("/dashboard");
		});
	};

	useEffect(() => {
		if (!isAuthenticated || !tokens) return;

		const fetchCart = async () => {
			try {
				const data = await cartClient.getCart({
					accessToken: tokens?.accessToken || "",
				});
				setCart(data);
			} catch (error) {
				console.error("장바구니 조회 실패:", error);
			}
		};

		fetchCart();
	}, [isAuthenticated, tokens]);

	if (!isAuthenticated) return null;

	return (
		<Sheet>
			<SheetTrigger
				onClick={() =>
					cartClient.getCart({
						accessToken: tokens?.accessToken || "",
					})
				}
			>
				<Button asChild variant="outline" size="icon" className="relative">
					<ShoppingCart className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-full sm:w-[400px] !right-0 z-[60] h-full flex flex-col"
			>
				<SheetHeader className="border-b p-4">
					<SheetTitle className="text-xl">{user?.email}님의 장바구니</SheetTitle>
					<SheetDescription className="text-sm">
						총 {totalCount}개 상품이 담겨있습니다
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto p-4">
					{isLoading ? (
						<LoadingSpinner />
					) : totalCount === 0 ? (
						<div className="space-y-4 text-center">
							<ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
							<p className="text-muted-foreground">장바구니가 비어있습니다</p>
						</div>
					) : (
						<CartItemList items={items} />
					)}
				</div>

				<SheetFooter className="border-t p-4">
					<div className="flex justify-between w-full mb-4">
						<span>총 수량:</span>
						<span className="font-medium">{totalCount}개</span>
					</div>
					<div className="flex justify-between w-full">
						<span>총 금액:</span>
						{isLoading ? (
							<Skeleton className="h-6 w-32" />
						) : (
							<span className="font-bold text-primary">₩{(totalPrice ?? 0).toLocaleString()}</span>
						)}
					</div>
					<Button className="w-full mt-4" onClick={checkoutHandler}>
						결제하기
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
