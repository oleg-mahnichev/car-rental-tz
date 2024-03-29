import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import makesData from '../../data/makes.json';
import { getAllAdverts } from '../../services/api';

const FilterBar = ({ applyFilters }) => {
  const [makesList, setMakesList] = useState([]);
  const [makeFilter, setMakeFilter] = useState('All');
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 500]);

  useEffect(() => {
    const sortedMakes = makesData.sort();
    setMakesList(sortedMakes);
  }, []);

  const handleApplyFilters = () => {
    getAllAdverts().then(adverts => {
      const filteredAdverts = adverts.filter(advert => {
        const makeMatch = makeFilter === 'All' || advert.make === makeFilter;
        const priceMatch =
          +advert.rentalPrice.replace('$', '') >= priceRangeFilter[0] &&
          +advert.rentalPrice.replace('$', '') <= priceRangeFilter[1];

        return makeMatch && priceMatch;
      });

      applyFilters(filteredAdverts);
    });
  };

  const options = makesList.map(make => ({ value: make, label: make }));

  return (
    <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
      <h3>Filters:</h3>
      <label>
        Make:
        <Select
          value={{ value: makeFilter, label: makeFilter }}
          onChange={selectedOption => setMakeFilter(selectedOption.value)}
          options={[{ value: 'All', label: 'All' }, ...options]}
          isSearchable
        />
      </label>
      <label>
        Price Range:
        <input
          type="range"
          min="0"
          max="500"
          value={priceRangeFilter[0]}
          onChange={e =>
            setPriceRangeFilter([+e.target.value, +priceRangeFilter[1]])
          }
        />
        ${priceRangeFilter[0].toFixed(2)} - ${priceRangeFilter[1].toFixed(2)}
      </label>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

FilterBar.propTypes = {
  applyFilters: PropTypes.func.isRequired,
};

export default FilterBar;
