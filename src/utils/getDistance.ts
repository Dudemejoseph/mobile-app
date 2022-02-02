// ======== Get total distance covered by user =============

export function getDistanceCovered(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2Rad(lat2 - lat1);
  let dLng = deg2Rad(lng2 - lng1);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2Rad(lat1)) *
      Math.cos(deg2Rad(lat1)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let d = R * c; // Distance in km
  return d.toFixed(3);
}

function deg2Rad(deg: number) {
  return deg * (Math.PI / 180);
}
