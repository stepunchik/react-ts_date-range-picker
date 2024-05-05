import React from 'react';
import ErrorMessage from './ErrorMessage';

type DatePickerProps = {
    inputClasses: string;
    startDate: string;
    endDate: string;
    isStartDateInvalid: boolean;
    isEndDateInvalid: boolean;
    onStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
    inputClasses,
    startDate,
    endDate,
    isStartDateInvalid,
    isEndDateInvalid,
    onStartDateChange,
    onEndDateChange,
}) => {
    return (
        <div className="input-container">
            <div className="input-field">
                <input
                    className={inputClasses}
                    type="text"
                    value={startDate}
                    onChange={onStartDateChange}
                    placeholder="MM.DD.YYYY"
                    maxLength={10}
                />
                {isStartDateInvalid && <ErrorMessage message="Invalid date" />}
            </div>
            <div>-</div>
            <div className="input-field">
                <input
                    className={inputClasses}
                    type="text"
                    value={endDate}
                    onChange={onEndDateChange}
                    placeholder="MM.DD.YYYY"
                    maxLength={10}
                />
                {isEndDateInvalid && <ErrorMessage message="Invalid date" />}
            </div>
        </div>
    );
};

export default DatePicker;