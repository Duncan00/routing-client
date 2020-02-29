import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Field, ErrorMessage } from 'formik';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import { createRoute, reset } from 'containers/App/actions';
import * as Yup from 'yup';
import Map from 'components/Map';
import saga from './saga';
import {
  makeSelectRoute,
  makeSelectError,
  makeSelectLoading,
} from '../App/selectors';
import Group from './Group';
import FlexForm from './FlexForm';
import ButtonGroup from './ButtonGroup';
import BorderlessButton from './BorderlessButton';
import Error from './Error';

const key = 'home';

export function HomePage({ onSubmitForm, onResetForm, route, error, loading }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { total_distance: totalDistance, total_time: totalTime, path } = route;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Formik
        initialValues={{
          starting_location: 'Innocentre, Hong Kong',
          drop_off_point: 'Hong Kong International Airport Terminal 1',
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
            <Group>
              <label htmlFor="starting_location">Starting Location</label>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Field name="starting_location" style={{ flexGrow: 10 }} />
                {values.starting_location && (
                  <BorderlessButton
                    type="button"
                    onClick={() => setFieldValue('starting_location', '')}
                    style={{ flexGrow: 1, flexBasis: '20px' }}
                  >
                    &#10006;
                  </BorderlessButton>
                )}
              </div>
              <Error>
                <ErrorMessage name="starting_location" component="div" />
              </Error>
            </Group>

            <Group>
              <label htmlFor="drop_off_point">Drop Off Point</label>
              <div style={{ display: 'flex' }}>
                <Field name="drop_off_point" />
                {values.drop_off_point && (
                  <BorderlessButton
                    type="button"
                    onClick={() => setFieldValue('drop_off_point', '')}
                  >
                    &#10006;
                  </BorderlessButton>
                )}
              </div>
              <Error>
                <ErrorMessage name="drop_off_point" component="div" />
              </Error>
            </Group>

            <Group />

            <Group>
              {totalDistance && <label>total distance: {totalDistance}</label>}
              {totalTime && <label>total time: {totalTime}</label>}
            </Group>

            {error && <Error>{error}</Error>}

            <ButtonGroup>
              <button type="submit" disabled={isSubmitting || loading}>
                {getSubmitButtonWord({ isSubmitting, loading, route, error })}
              </button>
              <button type="reset" disabled={isSubmitting || loading}>
                Reset
              </button>
            </ButtonGroup>
          </FlexForm>
        )}
      </Formik>
      <Map path={path} />
    </div>
  );
}

function getSubmitButtonWord({ isSubmitting, loading, route, error }) {
  if (isSubmitting || loading) {
    return 'Loading...';
  }
  if (route || error) {
    return 'Re-Submit';
  }
  return 'Submit';
}

HomePage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  onSubmitForm: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  route: makeSelectRoute(),
  error: makeSelectError(),
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values, { setSubmitting }) => {
      dispatch(reset());
      dispatch(createRoute(values.starting_location, values.drop_off_point));
      setSubmitting(false);
    },
    onResetForm: () => {
      dispatch(reset());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
