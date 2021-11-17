import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';



export const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Add User',
      path: '/auth/add',
      icon: <AiIcons.AiFillAlipayCircle />,
      cName: 'nav-text'
    },
    {
      title: 'User list',
      path: '/auth/admin',
      icon: <IoIcons.IoIosAlbums />,
      cName: 'nav-text'
    },
   
   
   
    
  ];