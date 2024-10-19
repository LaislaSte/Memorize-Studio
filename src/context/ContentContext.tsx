import { createContext, useContext, useEffect, useState } from 'react';
import { userType } from '../types/userType';
import services from '../services';
import { Slide, toast } from 'react-toastify';

type ContentContextType = {
  users: userType[];
};
const ContentContext = createContext<ContentContextType | null>(null);

interface IContentContextProvider {
  children: React.ReactNode;
}

export const ContentContextProvider: React.FC<IContentContextProvider> = ({
  children,
}) => {
  const [users, setUsers] = useState<userType[]>([]);

  async function findUsers() {
    const usersFound = await services.firetore.getDocuments('users');
    const snapshotData = usersFound?.docs ? usersFound?.docs : [];
    const myData = snapshotData as unknown as userType[];
    console.log(myData);
    return myData;
  }
  useEffect(() => {
    findUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        toast.error(`Erro: ${err}`, {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: 'dark',
          transition: Slide,
        });
      });
  }, []);

  return (
    <ContentContext.Provider value={{ users }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const contentContext = useContext(ContentContext);
  if (!contentContext) {
    throw new Error('There is no Context provider');
  }
  return contentContext;
};
