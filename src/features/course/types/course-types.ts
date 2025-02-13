
export type Course = {
  courseId: string;
  createdAt: string;
  courseName: string;
  courseSubject: string;
  courseInfo: string;
  courseTag: string;
  courseDiff: string;
  coursePrice: number;
  courseProfilePath: string;
  courseProfileOriginName: string;
  academyId: string;
  teacherId: string;
  teacherName: string;
  classCount: number;
};

export type CourseList = {
  courseList: Course[];
};

export type Class = {
  classId: string;
  createdAt: string;
  className: string;
  classContent: string;
  classSeq: number;
  classType: string;
  academyId: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
};

export type CourseDetail = {
  courseId: string;
  createdAt: string;
  courseName: string;
  courseSubject: string;
  courseInfo: string;
  courseTag: string;
  courseDiff: string;
  coursePrice: number;
  courseProfileOriginName: string;
  courseProfilePath: string;
  academyId: string;
  teacherId: string;
  teacherName: string;
  classCount: number;
  classList: Class[];
};

export type PurchasedCourse = {
  courseId: string;
  createdAt: string;
}

export type PurchasedCourseList = {
  purchasedCourses: PurchasedCourse[];
}

