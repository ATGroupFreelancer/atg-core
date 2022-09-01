import numeral from 'numeral';

export const formatCurrency = (value: number): string => {
    const numValue = numeral(value);
    return numValue.format('0,0').replace(/,/g, ' ');
}
