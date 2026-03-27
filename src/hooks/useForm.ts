import { useState, ChangeEvent } from 'react';

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let finalValue: any = value;
    if (type === 'number') {
      finalValue = value === '' ? '' : Number(value);
    }
    
    setValues({
      ...values,
      [name]: finalValue,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  }

  return {
    values,
    setValues,
    handleChange,
    resetForm,
  };
};
