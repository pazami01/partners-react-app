import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import SortableTable from './SortableTable';
import FilterForm from './FilterForm';
import FIELD_TYPES from './constants';

/**
 * Columns for table.
 */
const PARTNER_COLUMNS = {
  name: 'Partner',
  groupPrefix: 'Prefix',
  logo: 'Logo/Preroll',
  ofstedRating: 'Ofsted Rating',
};

/**
 * Data structure used to specify fields that can be filtered.
 */
const FILTER_FIELDS = [
  { name: 'name', label: 'Name', fieldType: FIELD_TYPES.INPUT, options: null },
  {
    name: 'groupPrefix',
    label: 'Prefix',
    fieldType: FIELD_TYPES.INPUT,
    options: null,
  },
  {
    name: 'ofstedRating',
    label: 'Ofsted Rating',
    fieldType: FIELD_TYPES.DROPDOWN,
    options: [
      { key: 'good', text: 'Good', value: 'good' },
      {
        key: 'requires improvement',
        text: 'Requires Improvement',
        value: 'requires improvement',
      },
      { key: 'inadequate', text: 'Inadequate', value: 'inadequate' },
      { key: 'outstanding', text: 'Outstanding', value: 'outstanding' },
    ],
  },
];

/**
 * This is the partner page.
 * Fetches partner data and displays it in a sortable and filterable table.
 */
const Partners = () => {
  const [partners, setPartners] = useState([]);

  const reversePartners = () => {
    setPartners((currPartners) => currPartners.slice().reverse());
  };

  const sortPartners = (columnToSortBy) => {
    setPartners((currPartners) => _.sortBy(currPartners, [columnToSortBy]));
  };

  const getPartners = async () => {
    const url =
      'https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json';

    return fetch(url).then((response) =>
      response.json().then((data) => data.getColleges)
    );
  };

  useEffect(() => {
    getPartners().then((data) => {
      setPartners(data);
    });
  }, []);

  /**
   * Filter partner data according to given filter values.
   * Param 'filters' must be an object with the following properties:
   * {name: string, groupPrefix: string, ofstedRating: [string]}
   */
  const handleFilterSubmit = (filters) => {
    getPartners().then((data) => {
      let filteredPartners = data;

      if (filters.name) {
        filteredPartners = filteredPartners.filter((partner) =>
          partner.name.includes(filters.name)
        );
      }

      if (filters.groupPrefix) {
        filteredPartners = filteredPartners.filter((partner) =>
          partner.groupPrefix.includes(filters.groupPrefix)
        );
      }

      if (filters.ofstedRating && filters.ofstedRating.length > 0) {
        filteredPartners = filteredPartners.filter((partner) =>
          filters.ofstedRating.includes(partner.ofstedRating.toLowerCase())
        );
      }

      setPartners(filteredPartners);
    });
  };

  return (
    <>
      <h1>Partners</h1>
      <FilterForm handleSubmit={handleFilterSubmit} fields={FILTER_FIELDS} />
      <SortableTable
        headers={PARTNER_COLUMNS}
        data={partners}
        sortData={sortPartners}
        reverseData={reversePartners}
      />
    </>
  );
};

export default Partners;
