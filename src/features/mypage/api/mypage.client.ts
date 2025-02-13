import apiClient from "@/lib/api-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const mypageClient = {
  changePassword: async (accessToken: string, newPassword: string) => {
    console.log("==> dropAccount called! => ", accessToken, newPassword);

    const response = await apiClient.post(
      `${API_BASE_URL}/api/auth/changePassword`,
      { password: newPassword },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    return response.data;
  },

  dropAccount: async (accessToken: string, userId: string) => {
    console.log("==> dropAccount called! => ", accessToken, userId);

    const response = await apiClient.get(`${API_BASE_URL}/api/auth/signout`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    if (response.status !== 200) {
      const message = response.data.message;
      console.error(message);
      throw new Error(message);
    }

    // TODO 로그아웃 처리하고, dashboard로 redirect처리해야함
    return response.data;
  },
};
