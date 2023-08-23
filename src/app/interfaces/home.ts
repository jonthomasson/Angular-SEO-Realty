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

export interface Home {
  id: number;
  tinyImage: string;
  largeImage: string;
  property: Property;
}

export interface Property {
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
      CS: string;
      DB: string;
      SB: string;
      ZI: string;
    }
  };
  summary: {
    propclass: string;
    propsubtype: string;
    proptype: string;
    propertyType: string;
    yearbuilt: number;
    propLandUse: string;
    propIndicator: string;
  };
  building: {
    size: {
      universalsize: number;
    };
    rooms: Record<string, unknown>; // Since rooms is an empty object, I've used a generic record type here
  };
  vintage: {
    lastModified: string;
    pubDate: string;
  };
}
