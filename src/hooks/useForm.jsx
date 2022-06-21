import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

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
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    console.log('isValid = ', isValid);
    // console.log('setIsValid = ', setIsValid);
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
