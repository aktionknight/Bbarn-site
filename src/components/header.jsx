import React, { useEffect, useState } from 'react';
import { useScrollProgress } from '../helpers/ScrollManager';
import Menu from './Menu';


function appleglass() {

}


export default function HeaderComp() {

    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScrollProgress();
    const thresh = (window.innerHeight * 4) + 50;

    useEffect(() => {
        if (scrollY < thresh) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [scrollY, thresh]);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 bg-black transition-transform duration-1000 ease-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
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

                {/* Menu Component replacing CTA Button */}
                <div className="relative z-50 flex gap-6 text-white  font-helvetica tracking-[-0.04em] font-medium">
                    <Menu />
                </div>

            </div>
        </header>
    );
}