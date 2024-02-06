export const preloadImages = (
  frameCount: number,
  getFrameSrc: (frame: number) => string,
  onAllImagesLoad: () => void,
) => {
  let count = 0;

  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.width = 0;
    img.height = 0;
    img.hidden = true;
    img.id = getFrameSrc(i);
    img.src = getFrameSrc(i);
    document.body.appendChild(img);
    img.onload = () => {
      count++;
      if (count === frameCount - 1) {
        onAllImagesLoad();
      }
    };
  }
};

export const preloadImage = (src: string, id: string) => {
  const img = new Image();
  img.width = 0;
  img.height = 0;
  img.hidden = true;
  img.id = id;
  img.src = src;
  document.body.appendChild(img);
};
