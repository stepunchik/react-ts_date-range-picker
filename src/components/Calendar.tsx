import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import DatePicker from './DatePicker';
import MonthAndYearPicker from './MonthAndYearPicker';
import WeekdayNames from './WeekdayNames';
import Day from './Day';

import { getDaysInMonth, formatInputValue } from '../utils/utils';

import "./Calendar.css";

type CalendarProps = {
    theme: "dark" | "light";
}

const Calendar: React.FC<CalendarProps> = ({ theme }) => {
    const [currentDate, setCurrentDate] = useState(moment());

    const [startDate, setStartDate] = useState<Moment | null>(moment());
    const [inputStartDate, setInputStartDate] = useState("");
    const [isStartDateInvalid, setIsStartDateInvalid] = useState<boolean>(false);

	const [endDate, setEndDate] = useState<Moment | null>(moment());
    const [inputEndDate, setInputEndDate] = useState("");
    const [isEndDateInvalid, setIsEndDateInvalid] = useState<boolean>(false);

    useEffect(() => {
        const newStartDate = moment(inputStartDate, "MM.DD.YYYY");
        setStartDate(newStartDate.isValid() ? newStartDate : moment());
        setIsStartDateInvalid(inputStartDate.length ? !newStartDate.isValid() : false);
    }, [inputStartDate]);

    useEffect(() => {
        const newEndDate = moment(inputEndDate, "MM.DD.YYYY");
        setEndDate(newEndDate.isValid() ? newEndDate : moment());
        setIsEndDateInvalid(inputEndDate.length ? !newEndDate.isValid() : false);
    }, [inputEndDate]);

    const [selectedMonth, setSelectedMonth] = useState(moment().month());
    const [selectedYear, setSelectedYear] = useState(moment().year());

    useEffect(() => {
        setCurrentDate(moment().month(selectedMonth).year(selectedYear));
    }, [selectedMonth, selectedYear]);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatInputValue(event.target.value);

        setInputStartDate(formattedValue);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatInputValue(event.target.value);

        setInputEndDate(formattedValue);
    };

    const [isStartDatePicked, setIsStartDatePicked] = useState<Boolean>(false);

    // day click handling
    // the first click should select the start date, and the second click should select the end date
    // the end date is selected only if it is chronologically after the start date
	const handleDayClick = (day: Moment | null) => {
        if (day) {
            if (!startDate || isStartDatePicked) {
                setStartDate(day);
                setEndDate(day);
                setInputStartDate(day.format("MM.DD.YYYY"));
                setInputEndDate(day.format("MM.DD.YYYY"));
                setIsStartDatePicked(false);
            } else if (day.isAfter(startDate)) {
                setEndDate(day);
                setInputEndDate(day.format("MM.DD.YYYY"));
                setIsStartDatePicked(true);
            } else {
                setStartDate(day);
                setEndDate(day);
                setInputStartDate(day.format("MM.DD.YYYY"));
                setInputEndDate(day.format("MM.DD.YYYY"));
                setIsStartDatePicked(false);
            }
        }
    };

    let currentDateCopy = currentDate.clone();

    const handleSubMonthClick = () => {
        currentDateCopy.subtract(1, 'M');
        setCurrentDate(currentDateCopy);
        setSelectedMonth(currentDateCopy.month());
    };
      
    const handleAddMonthClick = () => {
        currentDateCopy.add(1, 'M');
        setCurrentDate(currentDateCopy);
        setSelectedMonth(currentDateCopy.month());
    };
      
    const handleSubYearClick = () => {
        currentDateCopy.subtract(1, 'y');
        setCurrentDate(currentDateCopy);
        setSelectedYear(currentDateCopy.year());
    };
      
    const handleAddYearClick = () => {
        currentDateCopy.add(1, 'y');
        setCurrentDate(currentDateCopy);
        setSelectedYear(currentDateCopy.year());
    };

    // check if the day is in the range
    const isDaySelected = (date: Moment | null) => {
        if (startDate && endDate) {
            return date?.isBetween(startDate, endDate, 'day', '[]');
        }
        return false;
    };

    const calendarClasses = `calendar-container ${theme === "dark" ? "dark" : "light"}`
    const inputClasses = `input ${theme === "dark" ? "dark dark-input" : "light light-input"}`
    const selectClasses = `picked-item ${theme === "dark" ? "dark" : "light"}`

    return (
        <div className="container">
            <DatePicker
                inputClasses={inputClasses}
                startDate={inputStartDate}
                endDate={inputEndDate}
                isStartDateInvalid={isStartDateInvalid}
                isEndDateInvalid={isEndDateInvalid}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
            />
            <div className={calendarClasses}>
                <MonthAndYearPicker
                    selectClasses={selectClasses}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    setSelectedMonth={setSelectedMonth}
                    setSelectedYear={setSelectedYear}
                    onSubMonthClick={handleSubMonthClick}
                    onAddMonthClick={handleAddMonthClick}
                    onSubYearClick={handleSubYearClick}
                    onAddYearClick={handleAddYearClick}
                />
                <WeekdayNames />
                <div className="days-container">
                    {getDaysInMonth(currentDate).map((day, index) => (
                        <Day
                            key={index}
                            day={day}
                            isSelected={isDaySelected(day)}
                            onClick={() => handleDayClick(day)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;