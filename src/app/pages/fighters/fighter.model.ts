interface ImageUrls {
  icon: string;
  portrait: string;
}

interface SeriesInfo {
  icon: string;
  name: string;
}

export interface IFighter {
  description: string;
  images: ImageUrls;
  name: string;
  youtube: string;
  order: string;
  series: SeriesInfo;
}
