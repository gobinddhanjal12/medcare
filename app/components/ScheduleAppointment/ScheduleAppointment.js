"use client";

import { useRef, useState } from "react";
import styles from "./ScheduleAppointment.module.css";
import { ChevronDown, ChevronLeft, ChevronRight, CircleChevronLeft, CircleChevronRight, Sun, Sunset } from "lucide-react";
import DateSelector from "../DateSelector/DateSelector";

const ScheduleAppointment = () => {

    const [selectedSlot, setSelectedSlot] = useState(null);

    const [selectedOption, setSelectedOption] = useState("MedicareHeart Institute, Okhla Road");

    const [date, setDate] = useState(new Date(2022, 11));

    const changeMonth = (offset) => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + offset);
            return newDate;
        });
    };


    const timeSlots = [
        { time: "9:00 AM", available: false },
        { time: "9:30 AM", available: true },
        { time: "10:00 AM", available: false },
        { time: "10:30 AM", available: true },
        { time: "11:00 AM", available: false },
        { time: "11:30 AM", available: false },
        { time: "12:00 AM", available: true },
        { time: "12:30 PM", available: false },
    ];

    const dates = [
        { day: "Thu", date: "22 Dec" },
        { day: "Fri", date: "23 Dec" },
        { day: "Sat", date: "24 Dec" },
        { day: "Sun", date: "25 Dec" },
        { day: "Mon", date: "26 Dec" },
        { day: "Tue", date: "27 Dec" },
        { day: "Wed", date: "28 Dec" },
        { day: "Thu", date: "29 Dec" },
        { day: "Fri", date: "30 Dec" },
    ];


    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const scrollContainerRef = useRef(null);

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2 className={styles.title}>Schedule Appointment</h2>

                <button className={styles.bookButton}>Book Appointment</button>
            </div>


            <div className={styles.tabContainer}>
                <button className={`${styles.tab} ${styles.activeTab}`}>Book Video Consult</button>
                <button className={styles.tab}>Book Hospital Visit</button>
            </div>

            <div className={styles.dropdownWrapper}>
                <select
                    className={styles.dropdown}
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="MedicareHeart Institute, Okhla Road">MedicareHeart Institute, Okhla Road</option>
                    <option value="Apollo Hospital, Delhi">Apollo Hospital, Delhi</option>
                    <option value="Max Healthcare, Gurgaon">Max Healthcare, Gurgaon</option>
                </select>
                <ChevronDown className={styles.icon} size={28} />
            </div>

            <div className={styles.dateHeader}>
                <button className={styles.dateButton} onClick={() => changeMonth(-1)}>
                    <CircleChevronLeft size={28} className={styles.icon} />
                </button>
                <h3 className={styles.heading}>
                    {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
                </h3>
                <button className={styles.dateButton} onClick={() => changeMonth(1)}>
                    <CircleChevronRight size={28} className={styles.icon} />
                </button>
            </div>

            {/* <div className={styles.dateSelectorWrapper}>
                <div className={styles.dateSelector} ref={scrollContainerRef}>
                    {dates.map((item) => (
                        <button
                            key={item.date}
                            className={`${styles.dateButton} ${selectedDate.date === item.date ? styles.activeDate : ""}`}
                            onClick={() => setSelectedDate(item)}
                        >
                            <span className={styles.day}>{item.day}</span>
                            <span className={styles.date}>{item.date}</span>
                        </button>
                    ))}
                </div>

                <button className={styles.scrollButton} onClick={scrollRight}>
                    <CircleChevronRight size={28} />
                </button>
            </div> */}

            <DateSelector
                dates={dates}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                scrollRight={scrollRight}
            />


            <div className={styles.slotSection}>
                <h3 className={styles.slotTitle}><Sun /> Morning <span className={styles.slotCount}>2 Slots</span></h3>
                <hr className={styles.slotHr} />
                <div className={styles.slotGrid}>
                    {timeSlots.map((slot, index) => (
                        <button
                            key={index}
                            className={`${styles.slotButton} ${!slot.available ? styles.disabledSlot : ""} ${selectedSlot === slot.time ? styles.selectedSlot : ""}`}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedSlot(slot.time)}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.slotSection}>
                <h3 className={styles.slotTitle}><Sunset /> Afternoon <span className={styles.slotCount}>2 Slots</span></h3>
                <hr className={styles.slotHr} />
                <div className={styles.slotGrid}>
                    {timeSlots.map((slot, index) => (
                        <button
                            key={index}
                            className={`${styles.slotButton} ${!slot.available ? styles.disabledSlot : ""} ${selectedSlot === slot.time ? styles.selectedSlot : ""}`}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedSlot(slot.time)}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>
            </div>

            <button className={styles.nextButton}>Next</button>
        </div>
    );
};

export default ScheduleAppointment;
