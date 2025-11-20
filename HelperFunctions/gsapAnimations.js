import { ScrollTrigger } from "gsap/ScrollTrigger";

function animationsOnArrowKeys(){
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

window.addEventListener('keydown', (e) => {
  if (keys.includes(e.key)) {
 
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }
});
}


export function enableKeyboardScrollSupport() {
  const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
  
  const updateTriggers = () => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
  };

  const handleKeydown = (e) => {
    if (scrollKeys.includes(e.key)) {
      requestAnimationFrame(updateTriggers);
      setTimeout(updateTriggers, 50);
      setTimeout(updateTriggers, 150);
    }
  };

  window.addEventListener('keydown', handleKeydown);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
}
export {animationsOnArrowKeys}