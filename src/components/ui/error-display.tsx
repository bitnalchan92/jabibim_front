"use client";

export const ErrorDisplay = ({ message }: { message: string }) => (
	<div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">
		<p className="font-medium">⚠️ 오류 발생</p>
		<p className="text-sm mt-1">{message}</p>
	</div>
);
