"use client"
import gsap from 'gsap';
import { SplitText } from 'gsap-trial/SplitText';
gsap.registerPlugin(SplitText)


const AnimateTitle = (element : any, img: any ) => {
  let mySplitText = new SplitText('.hero_title',{type: 'words'} )

   let words = mySplitText.words
  //  gsap.set();

  //  // Animate the text with clipPath and other properties
  //  gsap.fromTo(,
  //    {},
  //    {
     
  //    }
  //  );

   const tl = gsap.timeline()

    tl.set(words, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' })
    // tl.from(img, {xPercent: 100, duration:1, ease: 'power1.in',})
    .fromTo(words,{
      yPercent: 100 
    },{
      yPercent: 0,
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
      stagger: 0.02,
     ease:'power1.in',
     //  delay: 1,
      duration: 1
    })
    .fromTo(img, {
      clipPath: 'circle(20.5% at 87% 86%)',
    

    },{
      duration: 0.5,
      ease: 'power2.inOut',
      
      clipPath: 'circle(141.4% at 100% 100%)'
    }
    )

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
