// import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';
// import { setLocalStorage } from '../services/servicesLocalStorage';
// import myContext from './myContext';

// const INITIAL_USER = {
//   email: '',
//   password: '',
// };

// function LoginProvider({ children }) {
//   const [user, setUser] = useState(INITIAL_USER);
//   const [disabled, setDisabled] = useState(true);
//   function handleChange({ target }) {
//     const { name, value } = target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   }

//   function validEmail(email) {
//     const splitEmail = email.split('@');

//     if (splitEmail.length === 2) {
//       const splitEmail2 = splitEmail[1].split('.');
//       if (splitEmail2.length === 2 && splitEmail2[1].length > 0) {
//         return true;
//       }
//       return false;
//     }
//     return false;
//   }

//   useEffect(() => {
//     const MIN_LENGTH_PASSWORD = 7;
//     if (user.password.length >= MIN_LENGTH_PASSWORD && validEmail(user.email)) {
//       setDisabled(false);
//     } else {
//       setDisabled(true);
//     }
//   }, [user]);

//   function handlerSubmit(e, history) {
//     e.preventDefault();
//     setLocalStorage('mealsToken', 1);
//     setLocalStorage('cocktailsToken', 1);
//     setLocalStorage('user', { email: user.email });
//     history.push('/comidas');
//   }

//   const objValue = {
//     user,
//     handleChange,
//     disabled,
//     handlerSubmit,
//   };

//   return (
//     <myContext.Provider value={ objValue }>
//       {children}
//     </myContext.Provider>
//   );
// }

// LoginProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default LoginProvider;
