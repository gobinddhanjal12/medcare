'use client';

import { useState } from 'react';
import styles from './doctorList.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import DoctorList from '../components/DoctorList/DoctorList';



export default function AvailableDoctors() {


    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <h1 className={styles.title}>Find a doctor at your own ease</h1>
                <SearchBar />
            </div>
            <DoctorList />
        </div>
    );
}
