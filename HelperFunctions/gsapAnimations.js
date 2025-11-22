import { ScrollTrigger } from "gsap/ScrollTrigger";

function animationsOnArrowKeys(){
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

window.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (keys.includes(e.key)) {
 
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }
});
}
// src/HelperFunctions/gsapAnimations.js (Your File)

export function enableKeyboardScrollSupport() {
  const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
  
  const handleKeydown = (e) => {
    if (scrollKeys.includes(e.key)) {
      // Allow native scroll to happen, then refresh ScrollTrigger shortly after.
      // We only need one clear refresh call.
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100); 
    }
  };

  window.addEventListener('keydown', handleKeydown);
  
  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
}



export {animationsOnArrowKeys}