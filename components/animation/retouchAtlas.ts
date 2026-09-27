import { Mesh, type MeshStandardMaterial, type Object3D } from 'three';

const ATLAS_SIZE = 1024;
const PADDING = 6;

type Rect = [number, number, number, number];

const TABLE_REGIONS: Rect[] = [
  [0, 629, 88, 745],
  [122, 629, 211, 745],
  [0, 779, 116, 1024],
  [149, 779, 265, 1024],
  [299, 779, 387, 1024],
  [421, 779, 510, 1024],
  [801, 380, 814, 455],
  [753, 380, 767, 455],
  [797, 670, 811, 745],
  [760, 264, 774, 339],
  [726, 495, 747, 570],
  [312, 282, 326, 357],
  [753, 813, 767, 888],
  [652, 244, 665, 319],
  [888, 373, 902, 387],
  [0, 106, 14, 120],
  [584, 115, 597, 136],
  [875, 489, 889, 503],
];

const PULLOVER_BACK_LOGO: Rect = [550, 827, 611, 874];

const luminance = (data: Uint8ClampedArray, i: number) =>
  0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

const recolorTable = (
  ctx: CanvasRenderingContext2D,
  scale: number,
  hex: string,
) => {
  const regions = TABLE_REGIONS.map(([x0, y0, x1, y1]) => {
    const x = Math.max(0, Math.floor((x0 - PADDING) * scale));
    const y = Math.max(0, Math.floor((y0 - PADDING) * scale));
    const width =
      Math.min(ctx.canvas.width, Math.ceil((x1 + PADDING) * scale)) - x;
    const height =
      Math.min(ctx.canvas.height, Math.ceil((y1 + PADDING) * scale)) - y;
    return { x, y, image: ctx.getImageData(x, y, width, height) };
  });

  const brightest = Math.max(
    ...regions.map(({ image }) => {
      let max = 0;
      for (let i = 0; i < image.data.length; i += 4)
        max = Math.max(max, luminance(image.data, i));
      return max;
    }),
  );

  const target = parseInt(hex.slice(1), 16);
  const rgb = [(target >> 16) & 255, (target >> 8) & 255, target & 255];

  regions.forEach(({ x, y, image }) => {
    const { data } = image;
    for (let i = 0; i < data.length; i += 4) {
      const shade = luminance(data, i) / brightest;
      data[i] = rgb[0] * shade;
      data[i + 1] = rgb[1] * shade;
      data[i + 2] = rgb[2] * shade;
    }
    ctx.putImageData(image, x, y);
  });
};

const eraseLogo = (
  ctx: CanvasRenderingContext2D,
  scale: number,
  [x0, y0, x1, y1]: Rect,
) => {
  const x = Math.floor((x0 - 3) * scale);
  const y = Math.floor(y0 * scale);
  const width = Math.ceil((x1 + 3) * scale) - x;
  const height = Math.ceil(y1 * scale) - y;
  const image = ctx.getImageData(x, y, width, height);
  const { data } = image;

  for (let row = 0; row < height; row++) {
    const left = row * width * 4;
    const right = left + (width - 1) * 4;
    for (let column = 1; column < width - 1; column++) {
      const t = column / (width - 1);
      const i = left + column * 4;
      for (let channel = 0; channel < 3; channel++)
        data[i + channel] =
          data[left + channel] * (1 - t) + data[right + channel] * t;
    }
  }

  ctx.putImageData(image, x, y);
};

export const retouchAtlas = (scene: Object3D, tableColor: string) => {
  scene.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const material = object.material as MeshStandardMaterial;
    const map = material.map;
    if (
      material.name !== 'palette.001' ||
      !map ||
      map.userData.tableColor === tableColor
    )
      return;

    const source = (map.userData.original ?? map.image) as
      | HTMLImageElement
      | ImageBitmap;
    map.userData.original = source;

    const canvas = document.createElement('canvas');
    canvas.width = source.width;
    canvas.height = source.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    ctx.drawImage(source, 0, 0);

    const scale = source.width / ATLAS_SIZE;
    recolorTable(ctx, scale, tableColor);
    eraseLogo(ctx, scale, PULLOVER_BACK_LOGO);

    map.image = canvas;
    map.userData.tableColor = tableColor;
    map.needsUpdate = true;
  });
};
