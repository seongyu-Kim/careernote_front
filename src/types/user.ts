export type UserLevel = '관리자' | '삐약이' | '꼬꼬닭';

export interface User {
  id: string;
  email: string;
  nickname: string;
  level: UserLevel;
  postCount: number;
}
