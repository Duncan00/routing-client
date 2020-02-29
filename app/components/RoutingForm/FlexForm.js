import styled from 'styled-components';
import { Form } from 'formik';

const FlexForm = styled(Form)`
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-height: 360px;

  @media only screen and (max-width: 600px) {
    width: 50%;
  }

  @media only screen and (min-width: 600px) {
    width: 360px;
  }
`;

export default FlexForm;
