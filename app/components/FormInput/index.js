import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import Error from '../Error';
import Group from '../Group';
import BorderlessButton from './BorderlessButton';
import StyledField from './StyledField';
import Flex from '../Flex';

const FormInput = ({ name, displayName, value, setFieldValue }) => (
  <Group>
    <label htmlFor={name}>{displayName}</label>
    <Flex>
      <StyledField name={name} />
      {value && (
        <BorderlessButton type="button" onClick={() => setFieldValue(name, '')}>
          &#10006;
        </BorderlessButton>
      )}
    </Flex>
    <Error>
      <ErrorMessage name={name} component="div" />
    </Error>
  </Group>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default FormInput;
