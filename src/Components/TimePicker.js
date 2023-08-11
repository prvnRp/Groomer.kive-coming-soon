import React, { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimePicker = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState('01:00 AM');
    const [selectedHour, setSelectedHour] = useState('01');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('AM');
    const [showCompleteDropdown, setShowCompleteDropdown] = useState(false);
    // const [selectedHour, setSelectedHour] = useState(11);
    // const [selectedMinute, setSelectedMinute] = useState(0);
    // const [selectedPeriod, setSelectedPeriod] = useState('AM');
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const timePeriods = ['AM', 'PM'];

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleTimeSelect = () => {
        const time = `${selectedHour}:${selectedMinute} ${selectedTimePeriod}`;
        setSelectedTime(time);
        setShowPicker(false);
    };

    const handleCompleteTimeChange = (timeOption) => {
        setSelectedHour(timeOption.hour.toString().padStart(2, '0'));
        setSelectedMinute(timeOption.minute.toString().padStart(2, '0'));
        setSelectedTimePeriod(timeOption.period);
        setSelectedTime(timeOption.label);
        setShowCompleteDropdown(false);
    };


    const handleCompleteDropdownClick = () => {
        setShowCompleteDropdown(!showCompleteDropdown);
    };

    const generateTimeOptions = () => {
        const times = [];
        const startTime = 11; // Starting hour
        const endTime = 23;   // Ending hour

        for (let hour = startTime; hour <= endTime; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const period = hour >= 12 ? 'PM' : 'AM';
                times.push({ hour, minute, period });
            }
        }

        return times;
    };

    const timeOptions = generateTimeOptions();

    // List of complete time options
    const completeTimeOptions = timeOptions.slice(0, 5).map(({ hour, minute, period }) => ({
        label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`,
        hour,
        minute,
        period,
    }));

    return (
        <div className="time-picker-container">
            <div className="time-picker-input">
                <input
                    type="text"
                    value={selectedTime}
                    readOnly
                    // onClick={togglePicker}
                    placeholder="Select Time"
                    onClick={handleCompleteDropdownClick}
                />
                <span className="time-picker-icon" onClick={togglePicker}>
                    <AccessTimeIcon style={{ fontSize: "20px" }} />
                </span>
            </div>
            {showPicker && (
                <div className="time-picker-dropdown">
                    <div className='time-picker-partitions'>
                        <div className="picker-column">
                            {hours.map(hour => (
                                <div
                                    key={hour}
                                    className={selectedHour === hour ? 'selected' : ''}
                                    onClick={() => setSelectedHour(hour)}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>
                        <div className="picker-column">
                            {minutes.map(minute => (
                                <div
                                    key={minute}
                                    className={selectedMinute === minute ? 'selected' : ''}
                                    onClick={() => setSelectedMinute(minute)}
                                >
                                    {minute}
                                </div>
                            ))}
                        </div>
                        <div className="picker-column">
                            {timePeriods.map(period => (
                                <div
                                    key={period}
                                    className={selectedTimePeriod === period ? 'selected' : ''}
                                    onClick={() => setSelectedTimePeriod(period)}
                                >
                                    {period}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="time-picker-ok-btn" onClick={handleTimeSelect}>
                        OK
                    </button>
                </div>
            )}
            {showCompleteDropdown && (
                <div
                    className='complete-time-dropdown'
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        backgroundColor: '#525252',
                        borderRadius: '15px',
                        color: '#fff',
                        zIndex: 999,
                        padding: '5px 6px',
                    }}
                >
                    {completeTimeOptions.map((timeOption, index) => (
                        <div
                            key={index}
                            onClick={() => handleCompleteTimeChange(timeOption)}
                            style={{ cursor: 'pointer' }}
                            className={selectedTime === timeOption.label ? 'selected time-picker-complete-option' : 'time-picker-complete-option'}
                        >
                            {timeOption.label}
                        </div>
                    ))}
                </div>
            )}
            {/* <span style={{ marginLeft: "5px", position: "relative", top: "-1px" }} onClick={handleCompleteDropdownClick}><i className={showCompleteDropdown ? 'arrow down' : 'arrow up'}></i></span> */}

        </div>
    );
};

export default TimePicker;