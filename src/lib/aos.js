import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export const useAOS = () => {
    useEffect(() => {
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            once: true,
        });
    }, []);
};