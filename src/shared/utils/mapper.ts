import type { CatReadDTO } from '../dto/cat-read';
import type { Cat } from '../dto/cat';

export const mapCatReadToCat = (catRead: CatReadDTO, favoriteIds: Array<string> = []): Cat => {
  return {
    id: catRead.id,
    url: catRead.url,
    width: catRead.width,
    height: catRead.height,
    isFavorite: favoriteIds.includes(catRead.id),
    breeds: catRead.breeds,
  };
};
