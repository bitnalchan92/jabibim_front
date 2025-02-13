"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="mx-[6rem] w-auto flex items-center gap-2">
			<div className="flex items-center space-x-2">
				<Switch
					id="dark-mode"
					checked={theme === "dark"}
					onCheckedChange={(checked) => {
						setTheme(checked ? "dark" : "light");
					}}
				/>
				<Label htmlFor="dark-mode">
					{theme === "dark" ? (
						<Moon className="h-[1.2rem] text-yellow-300 w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					) : (
						<Sun className="h-[1.2rem] text-orange-400 w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					)}
				</Label>
			</div>
		</div>
	);
}
