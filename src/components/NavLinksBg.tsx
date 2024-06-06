import { NavLinkProps } from '@/types';
import Link from 'next/link';
import React from 'react'

export const NavLinksBg = ({ href, children }: NavLinkProps) => {
  return (
    <li className="flex h-10 w-20 items-center justify-center rounded-3xl border border-neutral-700 bg-neutral-900 hover:bg-[#001344]">
      {href ? (
      <Link href={href} className="text-center text-sm font-normal text-white">
        {children}
      </Link>
      ) : (
      <button className="text-center text-sm font-normal text-white">
        {children}
      </button>
      )}
    </li>
  );
};
