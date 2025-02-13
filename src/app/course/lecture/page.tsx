"use client";

import Video from "@/features/course/components/video";
import ClassList from "@/features/course/components/classList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseLecturePage() {
  const searchParams = useSearchParams();
  const [courseId, setCourseId] = useState("");
  const [classId, setClassId] = useState("");
  const [videoPath, setVideoPath] = useState("");

  useEffect(() => {
    const id = searchParams.get("courseId");
    if (id) {
      setCourseId(id || "");
    }
  }, [searchParams]);

  const setDisplayVideoPath = (classId: string) => {
    setClassId(classId);
  };

  return (
    <div className='min-h-screen pt-12'>
      <main className='container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6'>
        {/* 강의 리스트 */}
        <aside className='lg:w-1/3 bg-white rounded-lg shadow-lg p-4 lg:h-screen overflow-hidden h-full'>
          <ClassList
            courseId={courseId}
            videoPath={videoPath}
            setVideoPath={setVideoPath}
            setDisplayVideoPath={setDisplayVideoPath}
          />
        </aside>

        {/* 비디오 재생 영역 */}
        <section className='lg:w-2/3 bg-white rounded-lg shadow-lg p-4 h-fit'>
          <Video classId={classId} />
        </section>
      </main>
    </div>
  );
}
