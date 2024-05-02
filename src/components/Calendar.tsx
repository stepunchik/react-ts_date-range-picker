import { useEffect, useState } from "react";
import moment, { Moment } from "moment";

import ArrowLeft  from "../assets/ArrowLeft.tsx";
import ArrowRight from "../assets/ArrowRight.tsx";
import "./Calendar.css";

type CalendarProps = {
    theme: "dark" | "light";
}

export const Calendar = (props: CalendarProps) => {

    const [currentDate, setCurrentDate] = useState<Moment>(moment());
    const currentYear: number = moment().year();

    // returning array of days in current month as moment objects
    const getDaysInMonth = (monthMoment: Moment) => {
        const monthCopy = monthMoment.clone().startOf('month');
		const firstDayOfWeek = monthCopy.day();

	    let days = [];

	    for (let i = 0; i < firstDayOfWeek; i++) {
			days.push(null);
		}

		while (monthCopy.month() === monthMoment.month()) {
			days.push(monthCopy.clone());
			monthCopy.add(1, 'd');
		}

		return days;
	}

	const [startDate, setStartDate] = useState<Moment | null>(moment());
    const [inputStartDate, setInputStartDate] = useState("");
    const [isStartDateInvalid, setIsStartDateInvalid] = useState<boolean>();

	const [endDate, setEndDate] = useState<Moment | null>(moment());
    const [inputEndDate, setInputEndDate] = useState("");
    const [isEndDateInvalid, setIsEndDateInvalid] = useState<boolean>();

    useEffect(() => {
        const newStartDate = moment(inputStartDate, "MM.DD.YYYY");
        setStartDate(newStartDate.isValid() ? newStartDate : moment());
        setIsStartDateInvalid(inputStartDate.length ? !newStartDate.isValid() : false);
        console.log(isStartDateInvalid);
    }, [inputStartDate]);

    useEffect(() => {
        const newEndDate = moment(inputEndDate, "MM.DD.YYYY");
        setEndDate(newEndDate.isValid() ? newEndDate : moment());
        setIsEndDateInvalid(inputEndDate.length ? !newEndDate.isValid() : false);
    }, [inputEndDate]);

	const handleDateChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<Moment | null>>
    ) => {
        const rawValue = event.target.value;

        const cleanedValue = rawValue.replace(/[^\d.]/g, '');
        const dotPositions = [2, 5];
        
        let formattedValue = cleanedValue;

        dotPositions.forEach((pos) => {
            if (formattedValue.length > pos && formattedValue[pos] !== '.') {
                formattedValue = formattedValue.slice(0, pos) + '.' + formattedValue.slice(pos);
            }
        }); 

        if (setter === setEndDate) {
            setInputEndDate(formattedValue);
        } else if (setter === setStartDate) {
            setInputStartDate(formattedValue);
        }
    };
	
	const [isStartDatePicked, setIsStartDatePicked] = useState<Boolean>(false);
	
    // day click handling
    // the first click should select the start date, and the second click should select the end date
    // the end date is selected only if it is chronologically after the start date
	const handleDayClick = (day: Moment) => {
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

    const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.month());
    const [selectedYear, setSelectedYear] = useState<number>(currentDate.year());

    useEffect(() => {
        setCurrentDate(moment().month(selectedMonth).year(selectedYear));
    }, [selectedMonth, selectedYear]);

    const handleSubMonthClick = () => {
        let currentDateCopy = currentDate.clone();
        currentDateCopy.subtract(1, 'M');
        setCurrentDate(currentDateCopy);
        setSelectedMonth(currentDateCopy.month());
    };
      
    const handleAddMonthClick = () => {
        let currentDateCopy = currentDate.clone();
        currentDateCopy.add(1, 'M');
        setCurrentDate(currentDateCopy);
        setSelectedMonth(currentDateCopy.month());
    };
      
    const handleSubYearClick = () => {
        let currentDateCopy = currentDate.clone();
        currentDateCopy.subtract(1, 'y');
        setCurrentDate(currentDateCopy);
        setSelectedYear(currentDateCopy.year());
    };
      
    const handleAddYearClick = () => {
        let currentDateCopy = currentDate.clone();
        currentDateCopy.add(1, 'y');
        setCurrentDate(currentDateCopy);
        setSelectedYear(currentDateCopy.year());
    };

    const monthNames: string[] = moment.localeData().months();

    // getting years from the final value to the initial value in descending order
    const getYearsFromTo = (start: number, end: number) => {
        const years: number[] = [];
        for(let year = end; year >= start; year--) {
            years.push(year);
        }
        return years;
    }

    // check if the day is in the range
    const isDaySelected = (date: Moment | null) => {
        if (startDate && endDate) {
          return date?.isBetween(startDate, endDate, 'day', '[]');
        }
        return false;
    };

    const calendarClasses = `calendar-container ${props.theme === "dark" ? "dark" : "light"}`
    const inputClasses = `input ${props.theme === "dark" ? "dark" : "light"}`
    const selectClasses = `picked-item ${props.theme === "dark" ? "dark" : "light"}`

    return (
        <div className="container">
            <div className="input-container">
                <div className="input-field">
                    <input
                        className={inputClasses}
                        type="text"
                        value={inputStartDate}
                        onChange={(e) => handleDateChange(e, setStartDate)}
                        placeholder="MM.DD.YYYY"
                        maxLength={10}
                    />
                    {isStartDateInvalid && <div className="error-message">Invalid date</div>}
                </div>
                <div>-</div>
                <div className="input-field">
                    <input
                        className={inputClasses}
                        type="text" 
                        value={inputEndDate}
                        onChange={(e) => handleDateChange(e, setEndDate)}
                        placeholder="MM.DD.YYYY"
                        maxLength={10}
                    />
                    {isEndDateInvalid && <div className="error-message">Invalid date</div>}
                </div>
            </div>
            <div className={calendarClasses}>
                <div className="arrow-picker">
                    <ArrowLeft onClick={() => handleSubMonthClick()}/>
                    <select
                        className={selectClasses}
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    >
                        {monthNames.map((month, index) => (
                            <option key={index} value={index}>{month.toString().padStart(2, '0')}</option>
                        ))}
                    </select>
                    <ArrowRight onClick={() => handleAddMonthClick()}/>
                </div>
                <div className="arrow-picker">
                    <ArrowLeft onClick={() => handleSubYearClick()}/>
                    <select
                        className={selectClasses}
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                        {getYearsFromTo(0, currentYear).map((year) => (
                            <option key={year} value={year}>{year.toString().padStart(4, '0')}</option>
                        ))}
                    </select>
                    <ArrowRight onClick={() => handleAddYearClick()}/>
                </div>
                <div className="weekday-names">
                    <div className="weekday">Su</div>
                    <div className="weekday">Mo</div>
                    <div className="weekday">Tu</div>
                    <div className="weekday">We</div>
                    <div className="weekday">Th</div>
                    <div className="weekday">Fr</div>
                    <div className="weekday">Sa</div>
                </div>
                <div className="days-container">
                    {/* displays days only if it not null in day array */}
                    {getDaysInMonth(currentDate).map((day, index) => (
                        <div 
                            key={index} 
                            className={`day ${isDaySelected(day) ? 'selected' : ''}`}
                            onClick={() => day && handleDayClick(day)}
                        >
							{day && day.date()}
						</div>                      
                    ))}
                </div>
            </div>  
        </div>
    );
}
