import React, { useState } from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SORT_DIRECTION = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

/**
 * Displays a table containing the given headers and data.
 * Must provivde sort and reverse methods to enable sorting.
 */
const SortableTable = ({ headers, data, sortData, reverseData }) => {
  const [state, setState] = useState({
    column: null,
    direction: null,
  });

  const sortTable = (columnToSortBy) => {
    // Data is already sorted by the given column, so we reverse it.
    if (columnToSortBy === state.column) {
      setState((currState) => ({
        ...currState,
        direction: SORT_DIRECTION.ASCENDING
          ? SORT_DIRECTION.DESCENDING
          : SORT_DIRECTION.ASCENDING,
      }));

      reverseData();
    } else {
      // Data to be sorted by the given column
      setState(() => ({
        column: columnToSortBy,
        direction: SORT_DIRECTION.ASCENDING,
      }));

      sortData(columnToSortBy);
    }
  };

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          {Object.keys(headers).map((header) => (
            <Table.HeaderCell
              key={header}
              sorted={state.column === header ? state.direction : null}
              onClick={() => sortTable(header)}
            >
              {headers[header]}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.name}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.groupPrefix}</Table.Cell>
            <Table.Cell>
              <Image src={item.logo} href={item.preroll} />
            </Table.Cell>
            <Table.Cell>{item.ofstedRating}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

SortableTable.propTypes = {
  headers: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  sortData: PropTypes.func.isRequired,
  reverseData: PropTypes.func.isRequired,
};

export default SortableTable;
