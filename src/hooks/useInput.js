import { useState } from 'react';

const useInput = (initialValue, validator, checker) => {
	const [value, setValue] = useState(initialValue);
	const [isValid, setIsValid] = useState(true);
	const [isFilled, setIsFilled] = useState(true);
	const onChange = e => {
		if (typeof checker === 'function') {
			if (checker(e.target.value)) {
				setValue(e.target.value);
				setIsFilled(true);
			}
		} else {
			setValue(e.target.value);
			setIsFilled(true);
		}
	};
	const onBlur = () => {
		if (value === '') {
			setIsFilled(false);
			setIsValid(true);
			return;
		}
		if (typeof validator === 'function') {
			setIsValid(validator(value));
			setIsFilled(true);
		}
	};
	return { value, isValid, isFilled, onChange, onBlur, setIsFilled };
};

export default useInput;
