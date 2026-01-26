import { set } from 'astro:schema';
import React, { useEffect, useState } from 'react';


function appleglass()
{
    
}


export default function HeaderComp()
{
    
    const [isVisible,setIsVisible]=useState(false);

    useEffect(()=>{
    const handleScroll=()=>{
        const scrollY=window.scrollY;
        const thresh = (window.innerHeight * 4)+50;
    if(scrollY<thresh)
    {
        setIsVisible(false); 
    }
    else{
        setIsVisible(true);
    }
    };
    
    window.addEventListener('scroll',handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll',handleScroll);
},[]);
    
    

return(
<header className={`fixed top-0 left-0 w-full z-50 bg-black transition-transform duration-1000 ease-out ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            
            <div className="flex justify-between items-center px-8 py-6">
                
                {/* Logo */}
                <h1 className="text-2xl font-helvetica tracking-[-0.04em] text-white font-bbarn">
                    The Bbarn.
                </h1>

                {/* Nav Links */}
                <nav className="flex gap-6 text-white  font-helvetica tracking-[-0.04em] font-medium">
                    
                    <a href="#about" className="hover:opacity-50 transition-opacity">Est. 2024</a>
                    
                </nav>

                {/* CTA Button */}
                <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-helvetica tracking-[-0.04em] hover:opacity-50 transition-opacity">
                    Book
                </button>

            </div>
        </header>
);
}