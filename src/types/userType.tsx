import { postType } from './postType';
import { v7 } from 'uuid';

export type userType = {
  id?: string;
  uid: typeof v7;
  authProvider?: string;
  name: string;
  email: string | null;
  avatar?: any;
  bios?: string;
  followers?: string[];
  following?: string[];
  arrCategorys: string[];
  posts?: postType[];
};
