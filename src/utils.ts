// slide에 표현할 영화 수
export const offset = 6;

export function getImagePath(id: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : "original"}/${id}`;
}
