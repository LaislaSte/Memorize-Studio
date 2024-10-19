import { userType } from './userType';

export type postType = {
  id: string;
  user: userType;
  title: string;
  category: string;
  content: string;
  img_content?: any | null;
  likes?: number;
  coments?: number;
};
