export const siteConfig = {
  title: 'EduPlatform',
  description: 'Education Management System',
  url: 'https://eduplatform.com',
  ogImage: 'https://eduplatform.com/og.jpg',
  keywords: ['교육', '학원 관리', '온라인 학습'],
  authors: [{ name: 'EduTeam', url: 'https://eduplatform.com' }],
  creator: 'EduPlatform Team',
  themeColor: '#ffffff',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9500'
  }
}; 