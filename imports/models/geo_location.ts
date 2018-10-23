export interface ILocation {
    latitude: number;
    longitude: number;
    formattedAddress: string;
    city: string;
    cityShort?:string;
    country: string;
    countryShort?: string;
    mapObject: any;
}