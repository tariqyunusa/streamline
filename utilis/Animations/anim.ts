"use client"
import gsap from 'gsap';

const AnimateTitle = async ( img: any) => {
  

  const tl = gsap.timeline();

  // tl.set(words, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' })
    tl.fromTo(img, {
      clipPath: 'circle(20.5% at 87% 86%)',
    }, {
      duration: 0.5,
      ease: 'power2.inOut',
      clipPath: 'circle(141.4% at 100% 100%)'
    })
    
  

  
};

export default AnimateTitle;
