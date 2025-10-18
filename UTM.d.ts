import * as L from 'leaflet';

export interface UtmPoint {
    x: number;
    y: number;
    zone: number;
    band: string;
    southHemi: boolean;
}

export interface UtmStringOptions {
    decimals?: number;
    format?: string;
    north?: string;
    sep?: string;
    south?: string;
}

export type toStringOptionsFn = (a: UtmStringOptions, b: UtmStringOptions) => UtmStringOptions;

export class Utm {
    constructor(
        x: number,
        y: number,
        zone: number,
        band: string,
        southHemi: boolean
    );

    static setDefaultOptions(options?: UtmStringOptions | toStringOptionsFn): void;

    clone(): Utm;
    dic(eastingNorthing?: boolean): Utm;
    equals(point: Utm): boolean;
    latLng(ignoreError?: boolean): L.LatLng | null | never;
    normalize(): Utm | null;
    toString(options: UtmStringOptions): string;

    x: number;
    y: number;
    zone: number;
    band: string;
    southHemi: boolean;
}

export function utm(
    x?: number | Partial<UtmPoint> | Utm,
    y?: number,
    zone?: number,
    band?: string,
    southHemi?: boolean
): Utm | null | undefined;

declare module 'leaflet' {
    // declared as LatLng.prototype.utm
    interface LatLng {
        utm(zone?: number, southHemi?: boolean): Utm | null | undefined;
    }
}
