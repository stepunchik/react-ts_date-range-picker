import moment from "moment";
import React from "react";
import ArrowLeft from "../assets/ArrowLeft";
import ArrowRight from "../assets/ArrowRight";

import { getYearsFromTo } from "../utils/utils";

type MonthAndYearPickerProps = {
    selectClasses: string;
    selectedMonth: number;
    selectedYear: number;
    setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
    onSubMonthClick: () => void;
    onAddMonthClick: () => void;
    onSubYearClick: () => void;
    onAddYearClick: () => void;
}

const MonthAndYearPicker: React.FC<MonthAndYearPickerProps> = ({
    selectClasses,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    onSubMonthClick,
    onAddMonthClick,
    onSubYearClick,
    onAddYearClick,
}) => {

    const monthNames = moment.localeData().months();
    const currentYear = moment().year();

    return (
        <div className="container">
            <div className="arrow-picker">
                <ArrowLeft onClick={onSubMonthClick}/>
                <select
                    className={selectClasses}
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                    {monthNames.map((month, index) => (
                        <option key={index} value={index}>{month.toString().padStart(2, '0')}</option>
                    ))}
                </select>
                <ArrowRight onClick={onAddMonthClick}/>
            </div>
            <div className="arrow-picker">
                <ArrowLeft onClick={onSubYearClick}/>
                <select
                    className={selectClasses}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                    {getYearsFromTo(0, currentYear).map((year) => (
                        <option key={year} value={year}>{year.toString().padStart(4, '0')}</option>
                    ))}
                </select>
                <ArrowRight onClick={onAddYearClick}/>
            </div>
        </div>
    );
};

export default MonthAndYearPicker;