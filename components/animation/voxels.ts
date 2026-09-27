import { BufferGeometry, Color, Float32BufferAttribute, Vector3 } from 'three';

export type Range = [number, number];
export type Cell = [number, number, number];
type Paint = string | ((x: number, y: number, z: number) => string);

const key = (x: number, y: number, z: number) => `${x},${y},${z}`;

export const speckle =
  (palette: string[]) =>
  (x: number, y: number, z: number): string =>
    palette[
      (((x * 73856093) ^ (y * 19349663) ^ (z * 83492791)) >>> 0) %
        palette.length
    ];

export const createVoxels = () => {
  const grid = new Map<string, { cell: Cell; color: string }>();

  const set = (x: number, y: number, z: number, paint: Paint) =>
    grid.set(key(x, y, z), {
      cell: [x, y, z],
      color: typeof paint === 'string' ? paint : paint(x, y, z),
    });

  const fill = (xs: Range, ys: Range, zs: Range, paint: Paint) => {
    for (let x = xs[0]; x <= xs[1]; x++)
      for (let y = ys[0]; y <= ys[1]; y++)
        for (let z = zs[0]; z <= zs[1]; z++) set(x, y, z, paint);
  };

  const ring = (
    cx: number,
    cz: number,
    ys: Range,
    inner: number,
    outer: number,
    paint: Paint,
  ) => {
    const r = Math.ceil(outer);
    for (let x = cx - r; x <= cx + r; x++)
      for (let z = cz - r; z <= cz + r; z++) {
        const distance = (x - cx) ** 2 + (z - cz) ** 2;
        if (distance > inner ** 2 && distance <= outer ** 2)
          fill([x, x], ys, [z, z], paint);
      }
  };

  const disc = (
    cx: number,
    cz: number,
    ys: Range,
    radius: number,
    paint: Paint,
  ) => ring(cx, cz, ys, -1, radius, paint);

  const blob = (center: Cell, radii: Cell, paint: Paint) => {
    const [cx, cy, cz] = center;
    const [rx, ry, rz] = radii;
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++)
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
        for (let z = Math.floor(cz - rz); z <= Math.ceil(cz + rz); z++)
          if (
            ((x - cx) / rx) ** 2 +
              ((y - cy) / ry) ** 2 +
              ((z - cz) / rz) ** 2 <=
            1
          )
            set(x, y, z, paint);
  };

  const carve = (...cells: Cell[]) =>
    cells.forEach(([x, y, z]) => grid.delete(key(x, y, z)));

  return { grid, set, fill, ring, disc, blob, carve };
};

const FACES = [
  {
    normal: [1, 0, 0],
    shade: 0.82,
    corners: [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
  },
  {
    normal: [-1, 0, 0],
    shade: 0.68,
    corners: [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
  },
  {
    normal: [0, 1, 0],
    shade: 1,
    corners: [
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    normal: [0, -1, 0],
    shade: 0.5,
    corners: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
  },
  {
    normal: [0, 0, 1],
    shade: 0.9,
    corners: [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
    ],
  },
  {
    normal: [0, 0, -1],
    shade: 0.74,
    corners: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  },
].map((face) => {
  const [a, b, c] = face.corners.map((corner) => new Vector3(...corner));
  const facesOut =
    b
      .sub(a)
      .cross(c.sub(a))
      .dot(new Vector3(...face.normal)) > 0;
  return {
    ...face,
    corners: facesOut ? face.corners : [...face.corners].reverse(),
  };
});

export const buildVoxelGeometry = ({
  grid,
}: ReturnType<typeof createVoxels>) => {
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const color = new Color();

  for (const {
    cell: [x, y, z],
    color: hex,
  } of grid.values()) {
    color.set(hex);
    for (const { normal, shade, corners } of FACES) {
      if (grid.has(key(x + normal[0], y + normal[1], z + normal[2]))) continue;
      const base = positions.length / 3;
      for (const [cx, cy, cz] of corners) {
        positions.push(x + cx - 0.5, y + cy, z + cz - 0.5);
        normals.push(...normal);
        colors.push(color.r * shade, color.g * shade, color.b * shade);
      }
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  return geometry;
};
