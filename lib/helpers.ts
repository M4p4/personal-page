export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const createSolidColorBase64 = (
  width: number,
  height: number,
  color: string
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/png');
};

export const blurImage = (w: number, h: number) => {
  const defaultBase64Color =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAZQ6iSAAAAABJRU5ErkJggg==';
  if (typeof window !== 'undefined') {
    return createSolidColorBase64(w, h, '#333');
  }
  return defaultBase64Color;
};
