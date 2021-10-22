import { useState, useEffect, useRef } from 'react';

const useInput = (initialValue, checker) => {
	const [value, setValue] = useState(initialValue);
	const [isFilled, setIsFilled] = useState(true);
	const ref = useRef();
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
	const onBlur = async () => {
		if (value === '') {
			setIsFilled(false);
		}
	};

	useEffect(() => {
		if (!isFilled) ref.current.focus();
	}, [isFilled]);

	return { value, isFilled, onChange, onBlur, setIsFilled, ref };
};

export default useInput;
