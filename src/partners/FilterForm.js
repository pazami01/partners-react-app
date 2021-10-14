import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import FIELD_TYPES from './constants';

/**
 * Displays a form according to the given fields.
 * Fields and a submission handler must be provided.
 */
const FilterForm = ({ handleSubmit, fields }) => {
  const [values, setValues] = useState({});

  const onChange = (event, data, name) => {
    setValues({ ...values, [name]: data.value });
  };

  const onSubmit = (event) => {
    handleSubmit(values);
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        {fields.map((field) => (
          <Form.Field key={field.name}>
            {field.fieldType === FIELD_TYPES.INPUT && (
              <Form.Input
                value={values[field.name] || ''}
                name={field.name}
                label={field.label}
                onChange={(e, data) => onChange(e, data, field.name)}
              />
            )}
            {field.fieldType === FIELD_TYPES.DROPDOWN && (
              <>
                <Dropdown.Header content={field.label} />
                <Dropdown
                  multiple
                  search
                  selection
                  options={field.options}
                  onChange={(e, data) => onChange(e, data, field.name)}
                />
              </>
            )}
          </Form.Field>
        ))}
        <Button type="submit">Apply</Button>
      </Form.Group>
    </Form>
  );
};

FilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      fieldType: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          text: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default FilterForm;
