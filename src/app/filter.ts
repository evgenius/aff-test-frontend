export interface Filter {
  getValue(): string;
}

export class PhotoFilter implements Filter {
  getValue(): string {
    return "photo";
  }
}

export class ContactFilter implements Filter {
  getValue(): string {
    return "contact";
  }
}

export class FavouriteFilter implements Filter {
  getValue(): string {
    return "favourite";
  }
}
