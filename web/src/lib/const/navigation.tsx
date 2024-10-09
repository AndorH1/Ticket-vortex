import { ReactNode } from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { CiEdit } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdEventAvailable } from 'react-icons/md';
import { IoTicketOutline } from 'react-icons/io5';
import { BiCalendarEvent } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';

export interface SidebarLinkType {
  key: string;
  label: string;
  path: string;
  icon: ReactNode;
  toggleIcon?: boolean;
  children?: SidebarLinkType[];
}

export const SIDERBAR_LINKS: SidebarLinkType[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <HiOutlineViewGrid />,
  },
  {
    key: 'events',
    label: 'Events',
    path: '/events',
    icon: <MdEventAvailable />,

    toggleIcon: true,
    children: [
      {
        key: 'edit-dashboard',
        label: 'All events',
        path: '/events/all',
        icon: <CiEdit />,
      },
      {
        key: 'add-event',
        label: 'Add Event',
        path: '/event/add',
        icon: <IoIosAddCircleOutline />,
      },
    ],
  },
  {
    key: 'ticket',
    label: 'Ticket',
    path: '/ticket',
    icon: <IoTicketOutline />,
    toggleIcon: true,
    children: [
      {
        key: 'edit-ticket',
        label: 'All ticket',
        path: '/ticket/all',
        icon: <CiEdit />,
      },
      {
        key: 'add-ticket',
        label: 'Add ticket',
        path: '/ticket/add',
        icon: <IoIosAddCircleOutline />,
      },
    ],
  },
  {
    key: 'reservation',
    label: 'Reservation',
    path: '/reservation',
    icon: <BiCalendarEvent />,

    toggleIcon: true,
    children: [
      {
        key: 'edit-reservation',
        label: 'All reservations',
        path: '/reservations/all',
        icon: <CiEdit />,
      },
    ],
  },
];

export const SIDEBAR_BOTTOM_LINKS: SidebarLinkType[] = [
  {
    key: 'user',
    label: 'Users',
    path: '/users',
    icon: <FaUserAlt />,
    toggleIcon: true,
    children: [
      {
        key: 'users',
        label: 'All users',
        path: '/users',
        icon: <CiEdit />,
      },
    ],
  },
];
