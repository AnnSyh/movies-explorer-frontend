import React from 'react';
import { useState, useCallback} from 'react';
import isEmail from 'validator/lib/isEmail';
// const isEmail = require('validator/lib/isEmail');

//хук управления формой
export function useForm() {

  const [values, setValues] = useState({});

  const handleChangeInput = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;
    setValues({
      ...values, 
      [name]: value
    });
  };

  return {values, handleChangeInput, setValues};
}


//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChangeInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'name' && target.validity.patternMismatch) {
      target.setCustomValidity('Имя должно содержать только латиницу, кириллицу, пробел или дефис.')
    } else {
      target.setCustomValidity('');
    }

    if (name === 'email') {
      if (!isEmail(value)) {
        target.setCustomValidity('Некорректый адрес почты.');
      } else {
        target.setCustomValidity('');
      }
    }


    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    // console.log('isValid = ', isValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChangeInput, errors, isValid, resetForm };
}
