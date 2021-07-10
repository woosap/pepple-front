module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ['airbnb', 'plugin:prettier/recommended'],
	rules: {
		'react/prop-types': 0,
		'react/jsx-props-no-spreading': 0,
	},
};
