const ROOM_ID_LENGTH = 1e8;
let ids: number[] = [];

export function getGUID (): number {
  let id = Math.random() * ROOM_ID_LENGTH >> 0;

  if (ids.indexOf(id) !== -1) {
    return getGUID();
  }
  ids.push(id);

  return id;
}

export function removeGUID (guid: number) {
  ids = ids.filter(id => id !== guid);
}