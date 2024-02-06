
export function renderFrame(canvas: HTMLCanvasElement, frameSrc: string) {
  const context = canvas.getContext('2d');
  const img = document.getElementById(frameSrc) as HTMLImageElement;
  context!.clearRect(0, 0, canvas.width, canvas.height);
  context!.drawImage(img, 0, 0, canvas.width, canvas.height);
}
