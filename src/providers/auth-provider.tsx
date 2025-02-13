"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_PATHS = ["/login", "/signup", "/dashboard"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	const pathname = usePathname();
	const router = useRouter();

	return <>{children}</>;
}
