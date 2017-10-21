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

export class CompatibilityFilter implements Filter {
  constructor(private minScore: number, private maxScore: number) {}
  getValue(): string {
    return "compatibility:" + this.minScore + ":" + this.maxScore;
  }
}

export class AgeFilter implements Filter {
  constructor(private minAge: number, private maxAge: number) {}
  getValue(): string {
    return "age:" + this.minAge + ":" + this.maxAge;
  }
}

export class HeightFilter implements Filter {
  constructor(private minHeight: number, private maxHeight: number) {}
  getValue(): string {
    return "height:" + this.minHeight + ":" + this.maxHeight;
  }
}

export class DistanceFilter implements Filter {
  constructor(private lat: string, private lon: string, private distance: string) {}
  getValue(): string {
    return "distance:" + this.lat + ":" + this.lon + ":" + this.distance;
  }
}
