import { BsPersonCircle } from 'react-icons/bs';
import { BiLogIn, BiInfoCircle } from 'react-icons/bi';

export const SidebarDataPublic = [
  {
    title: 'Login',
    path: '/login',
    icon: <BiLogIn />,
    cName: 'nav-text',
  },
  {
    title: 'Cadastrar',
    path: '/register',
    icon: <BsPersonCircle />,
    cName: 'nav-text',
  },
  {
    title: 'Sobre',
    path: '/aboutus',
    icon: <BiInfoCircle />,
    cName: 'nav-text',
  },
];
