// HOOKS AND LIBS
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { BiLogIn, BiInfoCircle } from 'react-icons/bi';

export const SidebarDataPublic = [
    {
        title: 'Login',
        path: '/login',
        icon: <BiLogIn />,
        cName: 'nav-text'
    },
    {
        title: 'Cadastrar',
        path: '/register',
        icon: <BsPersonCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre',
        path: '/about-us',
        icon: <BiInfoCircle />,
        cName: 'nav-text'
    },
]