export const asCurrency = (currencyInCents) => {
    const inDollars = currencyInCents / 100;
    return inDollars < 1000 ? `$${(currencyInCents / 100).toLocaleString()}` : '$1,000+';
};
