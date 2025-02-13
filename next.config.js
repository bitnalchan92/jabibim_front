/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // SWC 최적화 옵션
  swcMinify: true,
  compiler: {
    // 불필요한 console.log 제거
    removeConsole: process.env.NODE_ENV === "production",
    // emotion/styled-components 지원
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/:path*",
      },
    ];
  },
  // CORS 설정
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000/",
          }, // 실제 운영 환경에서는 특정 도메인으로 제한 https://bibimfront.vercel.app/
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },

          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Set-Cookie, Authorization, refreshToken, user",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.NODE_ENV === "development", // 개발 모드에서 최적화 해제
  },
};

module.exports = nextConfig;
