"use client";
import React, { useState } from "react";
import {Menu, MenuItem} from "../ui/navbar-menu";
import { cn } from './lib/utils'
import { Link } from "react-router-dom";

export function Header() {
  return (
    (<div className="relative w-full flex items-center justify-center z-[999]">
      <Navbar />
    </div>)
  );
}

function Navbar({
  className
}) {
  const [active, setActive] = useState(null);
  return (
    (<div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-[1000]", className)}>
      <Menu setActive={setActive}>
           
         {/* home */}
        <Link to={'/'}>  
        <MenuItem setActive={setActive} active={active} item="Home">
        </MenuItem>
        </Link>
            

        <Link to={'#'}>  
        <MenuItem setActive={setActive} active={active} item="About Us">
        </MenuItem>
        </Link>
            
        <Link to={'#'}>  
        <MenuItem setActive={setActive} active={active} item="Contact Us">
        </MenuItem>
        </Link>
            
      </Menu>
    </div>)
  );
}
