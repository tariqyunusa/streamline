import gsap from 'gsap';
import { SplitText } from 'gsap-trial/SplitText';
gsap.registerPlugin(SplitText)


const AnimateTitle = (element : any) => {
  let mySplitText = new SplitText('.hero_title',{type: 'words'} )

   let chars = mySplitText.words
  

   gsap.from(chars, {
    yPercent: 100,
    stagger: 0.02,
    ease: 'back.out',
    delay: 0.5,
    duration: 1,
    // clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'

   })
  };
  

export default AnimateTitle;
