import moment from 'moment';
import React from 'react';

type DayProps = {
    day: moment.Moment | null
    isSelected: boolean | undefined;
    onClick: () => void;
};

const Day: React.FC<DayProps> = ({ day, isSelected, onClick }) => {
    return (
        <div
            className={`day ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {day?.date()}
        </div>
    );
};

export default Day;