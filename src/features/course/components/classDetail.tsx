import { ClassDetailData } from "./classList";

type ClassDetailProps = {
  detail: ClassDetailData;
  setDisplayVideoPath: (classId: string) => void;
};

export default function ClassDetail({
  detail,
  setDisplayVideoPath,
}: ClassDetailProps) {
  const {
    academyId,
    classContent,
    classId,
    className,
    classSeq,
    classType,
    courseId,
    createdAt,
    teacherId,
    teacherName,
  } = detail;

  return (
    <div className='flex items-center border rounded-md border-gray-300 shadow-card my-2 p-4'>
      {/* 왼쪽: 썸네일 영상 이미지 */}
      {/* <div className="w-1/3">
        <img
          src="/placeholder.jpg"
          alt={className}
          className="object-cover w-full h-full rounded"
        />
      </div> */}
      {/* 오른쪽: 과정명과 재생 버튼 */}
      <div className='flex w-full justify-between items-center pl-1'>
        <div className='w-11/12 flex-1'>
          <h3 className='text-lg font-bold'>{className}</h3>
          <p className='text-gray-600'>{classContent}</p>
        </div>
        <button
          type='button'
          className='bg-blue-200 hover:bg-blue-300 text-blue-800 p-3 rounded-md flex items-center justify-center transition-all'
          onClick={() => setDisplayVideoPath(classId)}
        >
          {/* 재생 버튼 아이콘 (Play Button Icon) */}
          <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M8 5v14l11-7z' />
          </svg>
        </button>
      </div>
    </div>
  );
}
