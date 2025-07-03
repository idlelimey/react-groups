const getShortMonth = (m: number) => {
    const date = new Date();
    date.setMonth(m);
    const output: string = new Intl.DateTimeFormat('en-GB', {
        month: 'short',
    }).format(date);
    return output;
};

export const getDateString = (start: string, end: string) => {
    const s: (string | number)[] = start.split('-');
    const e: (string | number)[] = end.split('-');

    let o: string = '';

    s[1] = +s[1] - 1;
    e[1] = +e[1] - 1;

    if (s[0] === e[0]) {
        // Years are equal
        if (s[1] === e[1]) {
            // Months equal
            o =
                +s[2] +
                ' - ' +
                +e[2] +
                ' ' +
                getShortMonth(+s[1]) +
                ', ' +
                s[0];
        } else {
            // Months !equal
            o =
                +s[2] +
                ' ' +
                getShortMonth(+s[1]) +
                ' - ' +
                +e[2] +
                ' ' +
                getShortMonth(+e[1]) +
                ', ' +
                s[0];
        }
    } else {
        // Years !equal
        o =
            +s[2] +
            ' ' +
            getShortMonth(+s[1]) +
            ', ' +
            s[0] +
            ' - ' +
            +e[2] +
            ' ' +
            getShortMonth(+e[1]) +
            ', ' +
            e[0];
    }

    return o;
};
