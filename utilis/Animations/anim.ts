"use client"
import gsap from 'gsap';

const AnimateTitle = async ( img: any) => {
  const { SplitText } = await import('gsap-trial/SplitText');
  gsap.registerPlugin(SplitText);

  let mySplitText = new SplitText('.hero_title', { type: 'words' });

  let words = mySplitText.words;

  const tl = gsap.timeline();

  tl.set(words, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' })
    .fromTo(img, {
      clipPath: 'circle(20.5% at 87% 86%)',
    }, {
      duration: 0.5,
      ease: 'power2.inOut',
      clipPath: 'circle(141.4% at 100% 100%)'
    })
    .fromTo(words, {
      yPercent: 100
    }, {
      yPercent: 0,
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
      stagger: 0.02,
      ease: 'power1.in',
      duration: 1
    });

  return () => tl.kill();
};

export default AnimateTitle;
