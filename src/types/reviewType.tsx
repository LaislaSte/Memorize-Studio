import { postType } from './postType';

export type userType = {
  id: string;
  user_id: string;
  post_id: string;
  post: postType;
  actual_date: Date;
  final_date: Date;
  verified: boolean;
};
