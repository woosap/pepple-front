import { useState, useCallback, useEffect } from 'react';

const useIntersect = (onIntersect, option) => {
	const [ref, setRef] = useState(null);
	// intersecting이 있을 때 target 엔트리와 observer를 넘겨주자.
	const checkIntersect = useCallback(([entry], observer) => {
		if (entry.isIntersecting) {
			onIntersect(entry, observer);
		}
	}, []);
	// ref나 option이 바뀔 경우 observer를 새로 등록한다.
	useEffect(() => {
		let observer;
		if (ref) {
			observer = new IntersectionObserver(checkIntersect, {
				...option,
			});
			observer.observe(ref);
		}
		return () => observer && observer.disconnect();
	}, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
	// setRef를 넘겨주어서 ref를 변경시킬 수 있도록 한다.
	return [ref, setRef];
};

export default useIntersect;

// reference : https://godsenal.com/posts/React-Intersection-Observer%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/
