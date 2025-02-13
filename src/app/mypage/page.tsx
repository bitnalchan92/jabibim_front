"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { mypageClient } from "@/features/mypage/api/mypage.client";

// 비밀번호 유효성 검사 (8자리 이상, 숫자, 문자, 특수문자 포함), 정규식 일단 여기서만 사용해서 컴포넌트 외부로 뺌
const validatePassword = (pw: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    pw
  );
};

export default function MyPage() {
  const { user, tokens } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const { dropAccount, changePassword } = mypageClient;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValid(validatePassword(newPassword));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  // 비밀번호 확인 검사
  useEffect(() => {
    setIsMatching(password === confirmPassword && password !== "");
  }, [password, confirmPassword]);

  const isDeleteEnabled = deleteConfirm === "영구 삭제"; // 영구 삭제 텍스트 확인 유무

  return (
    <div className='container mx-auto max-w-3xl py-10 space-y-8'>
      {/* 이메일 출력 부분 */}
      <div className='md:grid md:grid-cols-3 md:gap-6 mt-12'>
        <div className='md:col-span-1'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Email
          </h2>
        </div>
        <div className='md:col-span-2'>
          <section className='p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800'>
            <Input value={user?.email} disabled />
          </section>
        </div>
      </div>

      {/* 비밀번호 출력 부분 */}
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            Password
          </h2>
        </div>
        <div className='md:col-span-2'>
          <section className='p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800'>
            <div className='mb-4'>
              <p
                className={`text-sm mt-2 ${
                  isValid ? "text-[#A3D9A5]" : "text-red-500"
                }`}
              >
                새로운 비밀번호
              </p>
              <Input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                className={`border ${
                  isValid ? "border-[#A3D9A5]" : "border-red-500"
                }`}
              />
            </div>

            <div className='mb-4'>
              <p
                className={`text-sm mt-2 ${
                  isMatching ? "text-[#A3D9A5]" : "text-red-500"
                }`}
              >
                비밀번호 확인
              </p>
              <Input
                type='password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`border ${
                  isMatching ? "border-[#A3D9A5]" : "border-red-500"
                }`}
              />
            </div>

            <div className='mt-8 justify-self-end'>
              <Button
                variant='outline'
                className={`p-2 ml-2 rounded-lg text-white font-semibold transition-all 
                ${
                  isValid && isMatching
                    ? "bg-[#A3D9A5] hover:bg-[#88C093]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isValid || !isMatching}
                onClick={() => {
                  changePassword(tokens?.accessToken ?? "", confirmPassword);
                }}
              >
                비밀번호 변경
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* 회원 탈퇴 부분 */}
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h2 className='text-lg font-semibold text-red-500'>Delete Account</h2>
        </div>
        <div className='md:col-span-2'>
          <section className='p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800'>
            <p className='text-sm text-gray-600 dark:text-gray-300 mt-2'>
              계정을 삭제하면 되돌릴 수 없습니다.
            </p>

            {/* 계정 삭제 확인 필드 */}
            <div className='mt-4 flex items-center space-x-4'>
              <Input
                type='text'
                placeholder='"영구 삭제" 입력'
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className='border border-gray-400 rounded-md px-3 py-2 w-full'
              />
            </div>

            <div className='mt-8 justify-self-end'>
              <Button
                variant='outline'
                className={`p-2 ml-2 rounded-lg text-white font-semibold transition-all
                ${
                  isDeleteEnabled
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isDeleteEnabled}
                onClick={() =>
                  dropAccount(tokens?.accessToken ?? "", user?.userId ?? "")
                }
              >
                회원 탈퇴
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
