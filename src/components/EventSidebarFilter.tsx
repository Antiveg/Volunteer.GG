"use client"
import React, { useState } from 'react'
import styles from './EventSidebarFilter.module.css'

interface Filters {
  categories: string[]
}

interface Props {
  category: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const EventSidebarFilter = ({ category, setCategories, filters, setFilters } : Props) => {
  // --- State for Sort By ---
  const [selectedSort, setSelectedSort] = useState('lorem1_cat1'); // Default selected sort

  // --- State for Filters ---
  // Expanded states for filter sections
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true, // Initially expanded as per image
    locations: true,  // Initially expanded as per image
    organizations: false,
    time: false,
    points: false,
  });

  // Selected filter options
  const [selectedFilterCategories, setSelectedFilterCategories] = useState([]);
  const [selectedFilterLocations, setSelectedFilterLocations] = useState([]);
  // Add more states here for organizations, time, points if they have selectable options

  // --- Dummy Data ---
  const sortCategories = [
    { id: 'lorem1_cat1', label: 'Lorem 1' },
    { id: 'lorem1_cat2', label: 'Lorem 1' },
    { id: 'lorem1_cat3', label: 'Lorem 1' },
    { id: 'lorem1_cat4', label: 'Lorem 1' },
    { id: 'lorem1_cat5', label: 'Lorem 1' },
  ];

  const filterableCategories = [
    { id: 'f_cat1', label: 'Lorem 1' },
    { id: 'f_cat2', label: 'Lorem 1' },
    { id: 'f_cat3', label: 'Lorem 1' },
    { id: 'f_cat4', label: 'Lorem 1' },
    { id: 'f_cat5', label: 'Lorem 1' },
  ];

  const filterableLocations = [
    { id: 'f_loc1', label: 'Lorem 1' },
    { id: 'f_loc2', label: 'Lorem 1' },
    { id: 'f_loc3', label: 'Lorem 1' },
    { id: 'f_loc4', label: 'Lorem 1' },
    { id: 'f_loc5', label: 'Lorem 1' },
  ];

  // --- Handlers ---
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (setter, value) => {
    setter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Reusable component for filter groups (optional, can be inlined)
  const FilterGroup = ({ title, options, selectedOptions, onOptionChange, sectionKey }) => (
    <div className={styles.filterSection}>
      <button
        className={`${styles.groupHeader} ${styles.filterGroupHeader}`}
        onClick={() => toggleFilterSection(sectionKey)}
        aria-expanded={expandedFilters[sectionKey]}
      >
        {title}
      </button>
      {expandedFilters[sectionKey] && (
        <div className={styles.optionsList}>
          {options.map((option : any) => (
            <label key={option.id} className={styles.optionItem}>
              <input
                type="checkbox"
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => onOptionChange(option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );


  return (
    <div className={styles.sidebarContainer}>
      {/* --- Sort By Section --- */}
      <h2 className={styles.mainTitle}>Sort By</h2>
      <div className={styles.sortSection}>
        <div className={`${styles.groupHeader} ${styles.sortGroupHeader}`}>Categories</div>
        <div className={styles.optionsList}>
          {sortCategories.map(option => (
            <label key={option.id} className={styles.optionItem}>
              <input
                type="radio"
                name="sortCategory"
                value={option.id}
                checked={selectedSort === option.id}
                onChange={handleSortChange}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* --- Filter Section --- */}
      <h2 className={styles.mainTitle}>Filter</h2>

      <FilterGroup
        title="Categories"
        options={filterableCategories}
        selectedOptions={selectedFilterCategories}
        onOptionChange={(value : any) => handleFilterChange(setSelectedFilterCategories, value)}
        sectionKey="categories"
      />

      <FilterGroup
        title="Locations"
        options={filterableLocations}
        selectedOptions={selectedFilterLocations}
        onOptionChange={(value : any) => handleFilterChange(setSelectedFilterLocations, value)}
        sectionKey="locations"
      />

      {/* Other filter headers (can be converted to FilterGroup if they have options) */}
      <div className={styles.filterSection}>
        <button
          className={`${styles.groupHeader} ${styles.filterGroupHeader}`}
          onClick={() => toggleFilterSection('organizations')}
          aria-expanded={expandedFilters.organizations}
        >
          Organizations
        </button>
        {expandedFilters.organizations && (
          <div className={styles.optionsList}>
            {/* Placeholder for organization options */}
            <p className={styles.placeholderText}>Organization options would go here.</p>
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <button
          className={`${styles.groupHeader} ${styles.filterGroupHeader}`}
          onClick={() => toggleFilterSection('time')}
          aria-expanded={expandedFilters.time}
        >
          Time
        </button>
        {expandedFilters.time && (
          <div className={styles.optionsList}>
            {/* Placeholder for time options */}
            <p className={styles.placeholderText}>Time options would go here.</p>
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <button
          className={`${styles.groupHeader} ${styles.filterGroupHeader}`}
          onClick={() => toggleFilterSection('points')}
          aria-expanded={expandedFilters.points}
        >
          Points
        </button>
        {expandedFilters.points && (
          <div className={styles.optionsList}>
            {/* Placeholder for points options */}
            <p className={styles.placeholderText}>Points options would go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSidebarFilter;