"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Footer() {
	const { theme } = useTheme();
	const logosrc = theme === "dark" ? "/images/logo_gray.png" : "/images/logo_black.jpg";
	return (
		<footer className="border-t bg-background dark:bg-dark-background text-text dark:text-dark-text p-6 grid md:grid-cols-2 gap-8">
			{/* 기업 정보 */}

			<div className="space-y-2 text-sm">
				<div className="flex items-center gap-2 mb-2">
					<Image src={logosrc} alt="Code Craft" width={130} height={130} />
				</div>
				코드 크래프트 <br />
				대표: 김찬 <br />
				개인정보책임관리자: 김찬 <br />
				사업자번호: 123-12-xxxxx <br />
				주소: 서울시 종로구
				<br />- <br />
				중앙HTA교육원: 서울시 종로구(123-12-12345)
				<br />
				통신판매업 신고번호: 2020-서울종로-xxxx
				<br />
				이메일: help.code-craft [@] google.com
				<br />
				전화번호: 02-xxxx-xxxx
			</div>

			{/* 법률 정보 */}
			<div className="space-y-2">
				<h3 className="font-semibold">Legal</h3>
				<ul className="space-y-1">
					<li>
						<Link href="/policies/terms">이용약관</Link>
					</li>
					<li>
						<Link href="/policies/privacy-policy">개인정보취급방침</Link>
					</li>
					<li>
						<Link href="/policies/refund-policy">취소 및 환불정책</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}
