import Footer from "@/components/global_layout/footer";
import Header from "@/components/global_layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GeistSans } from "geist/font";
import "./globals.css";
import { defaultMetadata } from "@/config/metadata";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata = defaultMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body suppressHydrationWarning className={`${GeistSans.className} antialiased min-h-screen`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider>
						<div suppressHydrationWarning className="justify-center flex min-h-screen flex-col">
							<Header />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
