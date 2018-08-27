export interface ItemDetail {
  edited: string;
  url: string;
  created: string;
}

export interface NonFilmDetail extends ItemDetail {
  name: string;
}
