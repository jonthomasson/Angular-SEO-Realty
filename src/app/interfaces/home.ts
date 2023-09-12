export interface ResponsePacket {
  status: ResponseStatus;
  property: Property[]
}

export interface ResponseStatus {
  version: string;
  code: number;
  msg: string;
  total: number;
  page: number;
  pagesize: number;
  transactionID: string;
}

export interface Property {
  [key: string]: any;
  identifier: {
    Id: number;
    fips: string;
    apn: string;
    attomId: number;
  };
  lot: {
    lotSize1: number;
  };
  address: {
    country: string;
    countrySubd: string;
    line1: string;
    line2: string;
    locality: string;
    matchCode: string;
    oneLine: string;
    postal1: string;
    postal2: string;
    postal3: string;
  };
  location: {
    accuracy: string;
    latitude: string;
    longitude: string;
    distance: number;
    geoid: string;
    geoIdV4: {
      CO: string;
      N1: string;
      N2: string;
      N4: string;
      CS: string;
      DB: string;
      SB: string;
      ZI: string;
      PL: string;
    }
  };
  summary: {
    price?: string;
    tinyImageUrl?: string;
    tinyImageWidth?: string;
    tinyImageHeight?: string;
    mediumImageUrl?: string;
    mediumImageWidth?: string;
    mediumImageHeight?: string;
    propclass: string;
    propsubtype: string;
    proptype: string;
    propertyType: string;
    yearbuilt?: number;
    propLandUse: string;
    propIndicator: string;
  };
  building: {
    size: {
      universalsize?: number;
    };
    rooms: Rooms; 
  };
  vintage: {
    lastModified: string;
    pubDate: string;
  };

  
}
 interface Rooms {
  bathstotal?: number;
  beds?: number
}

export interface PexelResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string;
  prev_page: string;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}
