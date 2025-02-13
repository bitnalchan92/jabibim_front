import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, "이메일을 입력해주세요")
    .email("유효한 이메일 형식이 아닙니다"),
  password: z.string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/, 
      "영문, 숫자, 특수문자를 포함해야 합니다"),
  academyId: z.string().uuid("유효한 학원 ID가 아닙니다")
});

export type LoginFormValues = z.infer<typeof loginSchema>; 

export const signupSchema = z.object({
  studentName: z.string().min(1, "이름을 입력해주세요"),
  studentEmail: z.string()
    .min(1, "이메일을 입력해주세요")
    .email("유효한 이메일 형식이 아닙니다"),
  studentPassword: z.string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/, 
      "영문, 숫자, 특수문자를 포함해야 합니다"),
  studentPhone: z.string().min(10, "전화번호를 입력해주세요")
  .regex(/^010-\d{4}-\d{4}$/, "010-xxxx-xxxx 형식으로 입력해주세요"),
  academyId: z.string().uuid("유효한 학원 ID가 아닙니다"),
  adsAgreed: z.boolean().optional()
});


export type SignupFormValues = z.infer<typeof signupSchema>;
