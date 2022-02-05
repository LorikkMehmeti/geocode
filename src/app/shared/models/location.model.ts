export interface Location {
    name: string;
    adress: string;
    city: string;
    longitude: number | string;
    latitude: number | string;
}

export interface ILocation {
    place_id?: string | number;
    osm_id?: string | number;
    osm_type?: string;
    licence?: string;
    lat?: string | number;
    lon?: string | number;
    boundingBox?: any;
    class?: string;
    type?: string;
    display_name?: string;
    display_place?: string;
    display_address?: string;
    address: Address;
}

interface Address {
    name: string;
    state: string;
    city: string;
    postcode?: string;
    country: string;
    country_code: string;
}