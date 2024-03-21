"use client";

import React, { useEffect, useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
import NavItem from "@/components/NavItem/NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const isOpen = activeIndex === i;
        const handleOpen = () => (isOpen ? setActiveIndex(null) : setActiveIndex(i));

        return (
          <NavItem
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            close={() => setActiveIndex(null)}
          />
        );

      })}
    </div>
  );
};

export default NavItems;