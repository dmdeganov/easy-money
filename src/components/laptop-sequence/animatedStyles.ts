export const animatedStyles = (currentSlide: number, width: number) => {
  if (width >= 1140) {
    return {opacity: currentSlide === 4 ? 1 : 0, y: '5vh', x: '-15%'};
  }
  if (width > 775 && width < 1140) {
    return {
      opacity: currentSlide === 4 ? 1 : 0,
      y: 0,
      x: '-15%'
    };
  }
  if (width > 640 && width < 775){
    return {
      opacity: currentSlide === 4 ? 1 : 0,
      y: 40,
      x: 0,
    };
  }

  if (width <= 640) {
    return {
      x: 0,
      y: 0,
      opacity: currentSlide === 4 ? 1 : 0,
    };
  }
};
