import { NavLinkProps } from '@/types';
import Link from 'next/link'
import React from 'react'

function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <li className="hidden h-12 w-40 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-[#001344] lg:flex">
      {href ? (
        <Link
          href={href}
          className="text-center text-lg font-normal text-white lg:text-[15px] xl:text-[18px]"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="text-center text-lg font-normal text-white lg:text-[15px] xl:text-[18px]"
        >
          {children}
        </button>
      )}
    </li>
  );
}

export default NavLink;