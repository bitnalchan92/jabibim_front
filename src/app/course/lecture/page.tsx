"use client";

import Video from "@/features/course/components/video";
import ClassList from "@/features/course/components/classList";
import { Suspense, useEffect, useState } from "react";

export default function CourseLecturePage() {
  const [courseId, setCourseId] = useState("");
  const [classId, setClassId] = useState("");
  const [videoPath, setVideoPath] = useState("");

  useEffect(() => {
    const id = "temp"; // TODO 쿼리스트링에서 courseId 가져올 수 있도록 수정하기!
    if (id) {
      setCourseId(id || "");
    }
  }, []);

  const setDisplayVideoPath = (classId: string) => {
    setClassId(classId);
  };

  return (
    <div className='min-h-screen pt-12'>
      <main className='container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6'>
        {/* 강의 리스트 */}
        <aside className='lg:w-1/3 bg-white rounded-lg shadow-lg p-4 lg:h-screen overflow-hidden h-full'>
          <Suspense fallback={<div>강의 목록 로딩 중입니다...</div>}>
            <ClassList
              courseId={courseId}
              videoPath={videoPath}
              setVideoPath={setVideoPath}
              setDisplayVideoPath={setDisplayVideoPath}
            />
          </Suspense>
        </aside>

        {/* 비디오 재생 영역 */}
        <section className='lg:w-2/3 bg-white rounded-lg shadow-lg p-4 h-fit'>
          <Suspense fallback={<div>비디오 출력부분 로딩 중입니다...</div>}>
            <Video classId={classId} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
