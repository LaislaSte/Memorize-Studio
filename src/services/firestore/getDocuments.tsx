import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
} from 'firebase/firestore';
import db from '../../config/Firestore';
import { useToast } from '../../hooks/useToast';

export const getDocuments = async (
  collectionRefName: string
): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> => {
  const q = query(collection(db, collectionRefName));

  try {
    const result = await getDocs(q);
    useToast({
      initailMessage: 'Getting Documents',
      updatedMessage: 'Get documents',
      type: 'success',
    });
    return result;
  } catch (error) {
    useToast({
      initailMessage: 'Getting Documents',
      updatedMessage: `${error}`,
      type: 'error',
    });
  }
  // return getDocs(q)
  //   .then((result) => {
  //     return result.docs;
  //   })
  //   .catch((err) => {
  //     useToast({
  //       initailMessage: '',
  //       updatedMessage: `${err.code}, ${err.message}`,
  //       type: 'error',
  //     });
  //   });

  //   const querySnapshot = await getDocs(q);
  //   const d = [];

  //   try {
  //     querySnapshot.forEach((doc) => {
  //       const userObj = {
  //         euid: doc.data().uid,
  //         ename: doc.data().name ? doc.data().name : null,
  //         eavatar: doc.data().imgURL ? doc.data().imgURL : null,
  //         ebios: doc.data().userBio ? doc.data().userBio : null,
  //         efollowers: doc.data().followers ? doc.data().followers : [],
  //         efollowing: doc.data().following ? doc.data().following : [],
  //       };
  //       d.push(userObj);
  //     });

  //     setUsers(d);
  //   } catch (error) {
  //     console.log(error);
  //   }
};
