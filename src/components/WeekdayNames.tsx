import React from 'react';
import moment from 'moment';

const WeekdayNames: React.FC = () => {
    const weekdayNames: string[] = moment.localeData("ru").weekdaysMin();

    return (
        <div className="weekday-names">
            {weekdayNames.map((weekday) => (
                <div key={weekday} className="weekday-name">
                    {weekday}
                </div>
            ))}
        </div>
    );
};

export default WeekdayNames;