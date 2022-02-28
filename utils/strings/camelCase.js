export const camelCase = (str) => {
    if (!str) {
        return '';
    }

    const cleanString = str.replace(/\W/g, '').replace(/\W/g, '');

    return cleanString
        .replace(/\s(.)/g, (s) => s.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, (s) => s.toLowerCase());
};
