import { Moment } from "moment";

// returning array of days in current month as moment objects
export const getDaysInMonth = (monthMoment: Moment) => {
    const monthCopy = monthMoment.clone().startOf('month');
    const firstDayOfWeek = monthCopy.day();

    let days: any[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
    }

    while (monthCopy.month() === monthMoment.month()) {
        days.push(monthCopy.clone());
        monthCopy.add(1, 'd');
    }

    return days;
};

export const formatInputValue = (rawValue: string) => {
    const cleanedValue = rawValue.replace(/[^\d.]/g, '');
    const dotPositions = [2, 5];
    
    let formattedValue = cleanedValue;

    dotPositions.forEach((pos) => {
        if (formattedValue.length > pos && formattedValue[pos] !== '.') {
            formattedValue = formattedValue.slice(0, pos) + '.' + formattedValue.slice(pos);
        }
    }); 

    return formattedValue;
}

export const getYearsFromTo = (start: number, end: number) => {
    const years: number[] = [];
    for(let year = end; year >= start; year--) {
        years.push(year);
    }
    return years;
}