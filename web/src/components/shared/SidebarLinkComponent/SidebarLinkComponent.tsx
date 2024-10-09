import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { SidebarLinkType } from '../../../lib/const/navigation';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';

interface SidebarLinkProps {
  item: SidebarLinkType;
}

const linkClasses =
  'flex items-center justify-between gap-2 font-light px-3 py-2 hover:bg-neutral-700 active:bg-neutral-600 rounded-sm text-base no-underline hover:no-underline';

export const SidebarLinkComponent: React.FC<SidebarLinkProps> = ({ item }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const mainLinkContent = (
    <div
      onClick={item.children ? handleToggle : undefined}
      className={classNames(
        pathname === item.path ? 'text-white' : 'text-neutral-400',
        linkClasses
      )}
    >
      <div className='flex items-center gap-2'>
        {item.icon}
        <span>{item.label}</span>
      </div>
      {item.children && (
        <span className='text-xl'>{isOpen ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />}</span>
      )}
    </div>
  );

  return (
    <div>
      {item.children ? mainLinkContent : <Link to={item.path}>{mainLinkContent}</Link>}
      <div
        className={classNames('overflow-hidden transition-max-height duration-500 ease-in-out', {
          'max-h-0': !isOpen,
          'max-h-96': isOpen,
        })}
      >
        {isOpen && item.children && (
          <div className='ml-4'>
            {item.children.map((child) => (
              <Link
                key={child.key}
                to={child.path}
                className={classNames(
                  pathname === child.path ? 'bg-neutral-900 text-white' : 'text-neutral-400',
                  linkClasses
                )}
              >
                <span className='text-xl'>{child.icon}</span>
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
