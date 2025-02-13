import apiClient from "@/lib/api-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const courseClient = {
  getCourseList: async (accessToken: string) => {
    const response = await apiClient.get(`${API_BASE_URL}/api/course/list`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }
    return response.data;
  },

  getCourseDetail: async (accessToken: string, courseId: string) => {
    const response = await apiClient.get(
      `${API_BASE_URL}/api/course/detail?id=${courseId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }
    return response.data;
  },

  getPurchasedCourses: async (accessToken: string) => {
    const response = await apiClient.get(
      `${API_BASE_URL}/api/course/purchased`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }
    return response.data;
  },

  getClassDetail: async (accessToken: string, classId: string) => {
    const response = await apiClient.get(
      `${API_BASE_URL}/api/course/classDetail?id=${classId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }

    return response.data;
  },
};
