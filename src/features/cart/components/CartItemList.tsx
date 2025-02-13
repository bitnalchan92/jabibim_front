"use client";

import { CartItem } from "../store/cart.store";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useCartStore } from "../store/cart.store";
import { cartClient } from "../api/cart.client";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const CartItemList = ({ items }: { items: CartItem[] }) => {
	const { removeItem } = useCartStore();
	const { tokens } = useAuthStore();

	const handleRemoveItem = (cartId: string) => {
		cartClient.removeFromCart(
			{ accessToken: tokens?.accessToken || "", refreshToken: tokens?.refreshToken || "" },
			cartId
		);

		removeItem(cartId);
	};

	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div key={item.cartId} className="flex items-center justify-between p-3 border rounded-lg">
					<div className="space-y-1">
						<h4 className="font-medium">{item.courseName}</h4>
						<p className="text-sm text-muted-foreground">{item.teacherName} 강사</p>
						<p className="text-sm">₩{item.coursePrice.toLocaleString()}</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => handleRemoveItem(item.cartId)}
						className="text-red-500 hover:bg-red-50"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
		</div>
	);
};
