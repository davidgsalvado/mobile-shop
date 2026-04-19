const INVALID_VALUES = ['-', 'N/A', 'n/a', '', 'null', 'undefined'];

export const isValid = (value: unknown): boolean => {
    if (value === null || value === undefined) return false;
    if (Array.isArray(value)) return value.length > 0 && value.some(isValid);
    return !INVALID_VALUES.includes(String(value).trim());
};