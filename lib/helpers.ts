export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const blurImage = (
  width: number,
  height: number,
  color: string = '#444444'
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feComponentTransfer><feFuncA type="discrete" tableValues="1 1"></feFuncA></feComponentTransfer></filter><rect width="${width}" height="${height}" fill="${color}" filter="url(#b)"></rect></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};
