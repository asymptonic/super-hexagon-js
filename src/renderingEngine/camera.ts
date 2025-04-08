export const camera = {
  x: 0,
  y: 0,
  z: 120,
  yaw: -1.3,
  pitch: 1.2,
  roll: 0,
  FOV: 10,
};

export function applyCamera(x: number, y: number): [number, number] {
  let z = 0;
  x -= camera.x;
  y -= camera.y;
  z += camera.z;
  z = z * Math.cos(camera.yaw) + x * Math.sin(camera.yaw);
  x *= Math.cos(camera.yaw);
  z = z * Math.cos(camera.pitch) + y * Math.sin(camera.pitch);
  y *= Math.cos(camera.pitch);

  return [(x / z) * camera.FOV, (y / z) * camera.FOV];
}

export function unapplyCamera(x: number, y: number): [number, number] {
  let z = 0;
  x /= camera.FOV;
  y /= camera.FOV;
  x /= Math.cos(camera.yaw);
  y /= Math.cos(camera.pitch);
  z = z / Math.cos(camera.yaw) + x * Math.sin(camera.yaw);
  z = z / Math.cos(camera.pitch) - y * Math.sin(camera.pitch);
  x += camera.x;
  y += camera.y;
  z -= camera.z;

  return [x, y];
}
