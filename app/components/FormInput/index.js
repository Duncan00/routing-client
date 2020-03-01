import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import Error from '../Error';
import Group from '../Group';
import BorderlessButton from './BorderlessButton';
import StyledField from './StyledField';
import Flex from '../Flex';

const FormInput = ({ name, displayName, value, setFieldValue }) => {
  const fieldId = name;

  useEffect(() => {
    const input = document.getElementById(fieldId);
    // eslint-disable-next-line no-undef
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () =>
      setFieldValue(name, input.value),
    );
  }, []);

  return (
    <Group>
      <label htmlFor={name}>{displayName}</label>
      <Flex>
        <StyledField id={fieldId} name={name} />
        {value && (
          <BorderlessButton
            type="button"
            onClick={() => setFieldValue(name, '')}
          >
            &#10006;
          </BorderlessButton>
        )}
      </Flex>
      <Error>
        <ErrorMessage name={name} component="div" />
      </Error>
    </Group>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default FormInput;
