import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <Search className={styles.icon} />
            <input
                type="text"
                placeholder="Search doctors..."
                className={styles.input}
            />
            <button className={styles.button}>Search</button>
        </div>

    );
};

export default SearchBar;
