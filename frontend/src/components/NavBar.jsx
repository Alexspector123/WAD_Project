import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authUser.js';
import { useContentStore } from '../store/content.js';

const NavBar = () => {
    const [isMobileMenuOpen, setIdMobileMenuOpen] = useState(false);
    const { user, logout } = useAuthStore();

    const toggleMobileMenu = () =>{
        setIdMobileMenuOpen(!isMobileMenuOpen);
    };

    const { setContentType } = useContentStore();

    return (
        <header className='max-w-[6x1vh] mx-auto flex flex-wrap items-center justify-between p-[4px] h-[20px]'>
            <div className='flex items-center gap-[10px] z-[50px]'>
                <Link to={"/"}>
                    <img src='netflix-logo.png' alt='Netflix Logo' className='w-[50px] size-max:w-[70px]'/>
                </Link>
                <div className='hidden size-auto items-center'>
                    <Link to={"/"} className='hover:underline' onClick={() => setContentType("movie")}>Movies</Link>
                    <Link to={"/"} className='hover:underline' onClick={() => setContentType("tv")}>TV Shows</Link>
                    <Link to={"/history"} className='hover:underline'>Search History</Link>
                </div>
            </div>

            <div className='flex gap-[2px] items-center z-[50px]'>
                <Link to={"/search"}>
                    <Search className="size-[20px] cursor-pointer "/>
                </Link>
                <img src={user.image} alt='Avatar' className='h-[8px] rounded cursor-pointer'/>
                <logout className='size-[20px] cursor-pointer' onClick={logout}/>

                <div className='size-max:hidden'>
                    <Menu className='size-[20px] cursor-pointer' onClick={toggleMobileMenu}/>
                </div>
            </div>

            {/* Mobile items*/}
            {isMobileMenuOpen && (
                <div className='w-full size-max:hidden mt-[4px] z-[50] bg-[black] border rounded border-[gray]/80'>
                    <Link to={"/"} className='block hover:underline p-[2vh]'
                    onClick={toggleMobileMenu}>Movies</Link>
                    <Link to={"/"} className='block hover:underline p-[2vh]'
                    onClick={toggleMobileMenu}>TV Shows</Link>
                    <Link to={"/history"} className='block hover:underline p-[2vh]'
                    onClick={toggleMobileMenu}>Search History</Link>
                </div>
            )}
        </header>
    );
}

export default NavBar