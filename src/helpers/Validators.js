export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

export const validatePassword = (password) => {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return regex.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
	const regex = /^\+?[1-9]\d{9,14}$/;
	return regex.test(phoneNumber);
};

export const validateDob = (dob) => {
	const date = new Date(dob);
	return !isNaN(date.getTime());
};
