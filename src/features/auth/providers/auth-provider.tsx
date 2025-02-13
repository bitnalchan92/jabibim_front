"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import Cookies from "js-cookie";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { logout } = useAuthStore();

	useEffect(() => {
		const refreshToken = Cookies.get("refreshToken");
		if (!refreshToken) {
			logout();
		}
	}, [logout]);

	return <>{children}</>;
}
