
export function interpolate(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

export function easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

