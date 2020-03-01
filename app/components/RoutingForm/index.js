import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../Error';
import Group from '../Group';
import FlexForm from './FlexForm';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import FormInput from '../FormInput';

const RoutingForm = ({ route, onSubmitForm, onResetForm, error, loading }) => {
  const { total_distance: totalDistance, total_time: totalTime } = route;

  return (
    <Formik
      initialValues={{
        starting_location: '',
        drop_off_point: '',
      }}
      validationSchema={Yup.object({
        starting_location: Yup.string().required('Required!'),
        drop_off_point: Yup.string().required('Required!'),
      })}
      onSubmit={onSubmitForm}
      onReset={onResetForm}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <FlexForm>
          <FormInput
            name="starting_location"
            displayName="Starting Location"
            value={values.starting_location}
            setFieldValue={setFieldValue}
          />

          <FormInput
            name="drop_off_point"
            displayName="Drop Off Point"
            value={values.drop_off_point}
            setFieldValue={setFieldValue}
          />

          <Group />

          <Group>
            {totalDistance && <label>total distance: {totalDistance}</label>}
            {totalTime && <label>total time: {totalTime}</label>}
          </Group>

          {error && <Error>{error}</Error>}

          <ButtonGroup>
            <Button type="submit" disabled={isSubmitting || loading}>
              {getSubmitButtonWord({ isSubmitting, loading, route, error })}
            </Button>
            <Button type="reset" disabled={isSubmitting || loading}>
              Reset
            </Button>
          </ButtonGroup>
        </FlexForm>
      )}
    </Formik>
  );
};

export function getSubmitButtonWord({ isSubmitting, loading, route, error }) {
  if (isSubmitting || loading) {
    return 'Loading...';
  }
  if (route || error) {
    return 'Re-Submit';
  }
  return 'Submit';
}

RoutingForm.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default RoutingForm;
