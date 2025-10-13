import * as L from 'leaflet';

declare module 'leaflet' {
    interface UtmStringOptions {
        decimals?: number;
        format?: string;
        north?: string;
        sep?: string;
        south?: string;
    }

    interface UtmPoint {
        x: number;
        y: number;
        zone: number;
        band: string;
        southHemi: boolean;
    }

    type toStringOptionsFn = (a: UtmStringOptions, b: UtmStringOptions) => UtmStringOptions;

    class Utm {
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

    function utm(
        x?: number | Partial<UtmPoint> | Utm,
        y?: number,
        zone?: number,
        band?: string,
        southHemi?: boolean
    ): Utm | null | undefined;

    // declared as L.LatLng.prototype.utm
    interface LatLng {
        utm(zone?: number, southHemi?: boolean): Utm | null | undefined;
    }
}
