import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/App/reducer';
import { createRoute, reset } from 'containers/App/actions';
import Map from 'components/Map';
import RoutingForm from 'components/RoutingForm';
import saga from './saga';
import {
  makeSelectRoute,
  makeSelectError,
  makeSelectLoading,
} from '../App/selectors';
import Container from './Container';

const key = 'home';

export function HomePage({ onSubmitForm, onResetForm, route, error, loading }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { path } = route;

  return (
    <Container>
      <RoutingForm
        route={route}
        onSubmitForm={onSubmitForm}
        onResetForm={onResetForm}
        error={error}
        loading={loading}
      />
      <Map path={path} />
    </Container>
  );
}

HomePage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
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
