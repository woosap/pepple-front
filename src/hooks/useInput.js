import { useState } from 'react';

const useInput = (initialValue, validator) => {
	const [value, setValue] = useState(initialValue);
	const [isFilled, setIsFilled] = useState(false);
	const onChange = e => {
		let willUpdate = true;
		if (typeof validator === 'function') {
			willUpdate = validator(value);
		}
		if (willUpdate) {
			setValue(e.target.value);
		}
	};
	const onBlur = () => {
		if (value !== '') setIsFilled(true);
	};
	return { value, isFilled, onChange, onBlur };
};

export default useInput;
