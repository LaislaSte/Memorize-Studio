import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  WhereFilterOp,
} from 'firebase/firestore';
import db from '../../config/Firestore';
import { useToast } from '../../hooks/useToast';

export const removeDocumentsByQuery = (
  collectionRefName: string,
  param: string,
  operation: WhereFilterOp,
  value: string
) => {
  const q = query(
    collection(db, collectionRefName),
    where(param, operation, value)
  );

  return getDocs(q)
    .then((result) => {
      result.forEach((document) => {
        deleteDoc(doc(db, collectionRefName, document.id));
      });
      useToast({
        initailMessage: 'Removing Document',
        updatedMessage: 'Document removed',
        type: 'success',
      });
    })
    .catch((err) => {
      useToast({
        initailMessage: 'Removing Document',
        updatedMessage: `Error: ${err.code}, ${err.message}`,
        type: 'error',
      });
    });

  // const thirdq = query(
  //     collection(db, 'revision'),
  //     where('userAdded', '==', uid)
  //   );
  //   const deleteReview = (reviewId) => {
  //     deleteDoc(doc(db, 'revision', reviewId));
  //   };
  //   getDocs(thirdq)
  //     .then((res) => {
  //       res.forEach((doc) => {
  //         deleteReview(doc.id);
  //       });
  //     })
  //     .then(() => {
  //       console.log('revisões do usuário deletadas: DB');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(error.message);
  //     });
};
