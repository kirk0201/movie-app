export function getImagePath(id: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : "original"}/${id}`;
}
