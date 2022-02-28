export const cleanString = (str) => {
    removeUnwantedStrings();
    removeUnwantedStrings();
    allLowerCase();
    trimSpaces();
    trimDoubleSpaces();
    removeApostraphes();
    replaceAmpersands();

    function allLowerCase() {
        str = str.toLowerCase();
    }

    function trimSpaces() {
        str = str.replace(/^\s+|\s+$/, '');
    }

    function trimDoubleSpaces() {
        str = str.replace(/\s{2,}/, ' ');
    }

    function removeApostraphes() {
        str = str.replace(/'/, '');
        // str = str.replace(/\'/, '');
    }

    function replaceAmpersands() {
        str = str.replace(/&/g, 'and');
    }

    function removeUnwantedStrings() {
        const unwanted = unwantedStrings.find((d) => str.includes(d));

        const unwantedAsRegEx = new RegExp(unwanted);

        str = str.replace(unwantedAsRegEx, ' ');
    }

    return str;
};

const unwantedStrings = [
    'Accessories - ',
    'Clothing - ',
    'bottoms - ',
    'Homeware - ',
    'Footwear - ',
    'Sale - ',
    'Shoes - ',
    'Home Decor - ',
    'Women - ',
    'Men - ',
    'Bags - '
];
