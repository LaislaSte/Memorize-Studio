import {
  collection,
  getDocs,
  query,
  where,
  WhereFilterOp,
} from 'firebase/firestore';
import db from '../../config/Firestore';
import { useToast } from '../../hooks/useToast';

export const getDocumentByQuery = async (
  collectionRefName: string,
  param: string,
  operation: WhereFilterOp,
  value: string
) => {
  const q = query(
    collection(db, collectionRefName),
    where(param, operation, value)
  );

  try {
    const result = await getDocs(q);
    useToast({
      initailMessage: 'Getting Documents',
      updatedMessage: 'Get documents',
      type: 'success',
    });
    return result;
  } catch (err) {
    useToast({
      initailMessage: '',
      updatedMessage: `${err}`,
      type: 'error',
    });
  }
};
