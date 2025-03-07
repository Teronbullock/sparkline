import { useReducer } from 'react';
import apiFetch from '@/utils/fetch';

interface IRegReducerState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegReducerAction {
  type: 'SUBMIT' | 'ON_CHANGE';
  payload: {
    name: string;
    value: string;
  };
}

const registerReducer = (state: IRegReducerState, action: IRegReducerAction) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'SUBMIT':
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    default:
      return state;
  }
};

export default function useManageRegister() {
  const [state, dispatch] = useReducer(registerReducer, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'ON_CHANGE',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // send a POST request to the server
    try {
      const res = await apiFetch({
        url: '/api/user/register',
        method: 'post',
        data: {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          confirmPassword: state.confirmPassword,
        },
      });
      console.log('TEST - Response from server', res);
    } catch (err) {
      console.error('Error with submitting form to server', err);
    }
  };

  return { state, dispatch, onChange, onSubmit };
}
