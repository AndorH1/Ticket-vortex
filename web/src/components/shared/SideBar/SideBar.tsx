import React from 'react';
import { IoTicketSharp } from 'react-icons/io5';
import { SIDERBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from '../../../lib/const/navigation';
import { SidebarLinkComponent } from '../SidebarLinkComponent/SidebarLinkComponent';
import { useAuth } from '../../../context/AuthContext';
import { SidebarLinkType } from '../../../lib/const/navigation';

export const SideBar: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.role;

  const filterLinksByRole = (links: SidebarLinkType[]): SidebarLinkType[] => {
    return links.filter((link) => {
      if (link.key === 'user' && userRole !== 'admin') {
        console.log('User is not an admin');
        console.log('User role:', userRole);
        return false;
      }

      if (link.children) {
        link.children = link.children.filter((child) => {
          if (child.key === 'add-ticket' && userRole === 'user') {
            return false;
          }
          if (child.key === 'add-event' && userRole === 'user') {
            return false;
          }
          if (child.key === 'add-user' && userRole === 'user') {
            return false;
          }
          return true;
        });

        if (link.children.length === 0) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredSidebarLinks = filterLinksByRole(SIDERBAR_LINKS);
  const filteredSidebarBottomLinks = filterLinksByRole(SIDEBAR_BOTTOM_LINKS);

  return (
    <div className='flex flex-row bg-neutral-100 overflow-hidden max-h-full'>
      <div className='bg-gray-900 w-60 p-5 flex flex-col text-white'>
        <div className='flex items-center gap-2 px-1 py-3'>
          <IoTicketSharp />
          <span className='text-neutral-100 text-lg'>Vortex ticket</span>
        </div>
        <div className='flex-1 py-8 flex flex-col gap-0.5'>
          {filteredSidebarLinks.map((item) => (
            <SidebarLinkComponent key={item.key} item={item} />
          ))}
        </div>
        <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
          {filteredSidebarBottomLinks.map((item) => (
            <SidebarLinkComponent key={item.key} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
