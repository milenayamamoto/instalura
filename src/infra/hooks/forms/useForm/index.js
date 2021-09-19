import { useEffect, useState } from 'react';

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = useState(initialValues);

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouchedFields] = useState({});

  useEffect(() => {
    validateSchema(values)
      .then(() => {
        setIsFormDisabled(false);
        setErrors({});
      })
      .catch((err) => {
        const formattedErrors = err.inner.reduce((acc, currentError) => {
          const fieldName = currentError.path;
          const errorMessage = currentError.message;

          return { ...acc, [fieldName]: errorMessage };
        }, {});

        setErrors(formattedErrors);
        setIsFormDisabled(true);
      });
  }, [values]);

  return {
    values,
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;

      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    isFormDisabled,
    setIsFormDisabled,
    errors,
    touched,
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');
      setTouchedFields({
        ...touched,
        [fieldName]: true,
      });
    },
  };
}
