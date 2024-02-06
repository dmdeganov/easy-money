export const getAnimatedStyles = (currentSlide: number, width: number) => {
  if (width >= 1280) {
    switch (currentSlide) {
      case 0:
        return {scale: 1.3, x: -50, opacity: 1, y: 0};
      case 1:
        return {
          scale: 1.3,
          x: '-10vw',
          y: 200,
          opacity: 1,
        };
      default:
        return {scale: 1.3, opacity: 0, x: -300, y: 400};
    }
  }
  if (width > 640 && width < 1280  ) {
    switch (currentSlide) {
      case 0:
        return {scale: 1.2, x: 250, opacity: 1, y: 0};
      case 1:
        return {
          scale: 1.2,
          x: '-10vw',
          y: 200,
          opacity: 1,
        };
      default:
        return {scale: 1.3, opacity: 0, x: '-10vw', y: 400};
    }
  }
  if (width <= 640) {
    switch (currentSlide) {
      case 0:
        return {
          opacity: 1,
          y: '-10vw',
          scale: 1.1,
          x: 0,
        };
      case 1:
        return {
          opacity: 1,
          y: '30%',
          scale: 1.1,
          x: '-45%',
        };
      default:
        return {
          opacity: 0,
          x: '-30%',
          y: '60%',
          scale: 1.1,
        };
    }
  }
};

