import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import ClassDetail from "./classDetail";
import { courseClient } from "@/features/course/api/course.client";
import { useAuthStore } from "@/features/auth/store/auth.store";

type ClassListProps = {
  courseId: string;
  videoPath: string;
  setVideoPath: Dispatch<SetStateAction<string>>;
  setDisplayVideoPath: (classId: string) => void;
};

export type ClassDetailData = {
  academyId: string;
  classContent: string;
  classId: string;
  className: string;
  classSeq: number;
  classType: string;
  courseId: string;
  createdAt: string;
  teacherId: string;
  teacherName: string;
};

export default function ClassList({
  courseId,
  videoPath,
  setVideoPath,
  setDisplayVideoPath,
}: ClassListProps) {
  const simpleBarRef = useRef<any>(null);
  const { tokens } = useAuthStore();
  const { getCourseDetail } = courseClient;

  const [classList, setClassList] = useState<ClassDetailData[]>([]);

  useEffect(() => {
    simpleBarRef.current?.recalculate();

    async function fetchCourseDetail() {
      const data = await getCourseDetail(tokens?.accessToken ?? "", courseId);

      setClassList(data.courseDetail.classList);
    }

    fetchCourseDetail();
  }, [courseId]);

  return (
    <div className='text-black h-full flex flex-col'>
      <section className='border-b border-gray-400 py-4 mb-4'>
        <p className='text-2xl font-bold mb-2'>커리큘럼</p>
        <p className='text-xl font-semibold mb-1'>
          ✏️ 스프링 핵심 원리 - 기본편
        </p>
        <p className='text-sm text-gray-600'>
          Java Spring(자바 스프링) 핵심원리를 다루는 기본편 강의
        </p>
      </section>
      <section className='overflow-auto'>
        <SimpleBar ref={simpleBarRef} autoHide={false}>
          {classList.map((item) => (
            <ClassDetail
              key={item.classId}
              detail={item}
              setDisplayVideoPath={setDisplayVideoPath}
            />
          ))}
          <div className='h-4' />
        </SimpleBar>
      </section>
    </div>
  );
}
