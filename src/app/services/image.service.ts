import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  showIcon(icoUrl: string) {
    return icoUrl ? icoUrl : 'default-icon.png';
  }

  showImage(imageUrl: string | undefined) {
    return imageUrl ? imageUrl : 'assets/images/default-image.png';
  }
}
