"use client"
import gsap from 'gsap';
import { SplitText } from 'gsap-trial/SplitText';
gsap.registerPlugin(SplitText)


const AnimateTitle = (element : any) => {
  let mySplitText = new SplitText('.hero_title',{type: 'words'} )

   let words = mySplitText.words
   gsap.set(words, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' });

   // Animate the text with clipPath and other properties
   gsap.fromTo(words,
     { yPercent: 100 },
     {
       yPercent: 0,
       clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
       stagger: 0.02,
       ease: 'back.out',
       delay: 1,
       duration: 2
     }
   );

  //  gsap.from(chars, {
  //   yPercent: 100,
  //   stagger: 0.02,
  //   ease: 'back.out',
  //   delay: 0.5,
  //   duration: 1,
  //   // clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'

  //  })
  
  };
  

export default AnimateTitle;
