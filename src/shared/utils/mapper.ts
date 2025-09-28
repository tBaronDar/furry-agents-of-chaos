import type { CatReadDTO } from '../dto/cat-read';
import type { Cat } from '../dto/cat';

export const mapCatReadToCat = (catRead: CatReadDTO): Cat => {
  return {
    id: catRead.id,
    url: catRead.url,
    width: catRead.width,
    height: catRead.height,
    isFavorite: false,
    breeds: catRead.breeds,
  };
};
