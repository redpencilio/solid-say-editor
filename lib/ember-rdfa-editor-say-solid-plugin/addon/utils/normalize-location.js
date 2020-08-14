export default function normalizeLocation(location, reference) {
  return [location[0] + reference[0], location[1] + reference[0]];
}
