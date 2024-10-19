const nameValid = (name) => {
	return name?.toString().length > 2 || name?.toString().length < 20;
}

const emailValid = (email) => {
	const emailS = email?.toString()
	return emailS.length > 5 && emailS.includes('@') && emailS.includes('.');
}

const passwordValid = (password) => {
	return password?.toString().length > 5;
}

const passConfValid = (password, passConf) => {
	return passwordValid(password) && password === passConf
}

const biosValid = (bio) => {
	return bio?.toString().length <= 500;
}

const postContentValid = (postContent) => {
	return postContent?.toString().length < 1000;
}

const titleValid = (title) => {
	return title?.toString().length < 40;
}

const validCBpost = (arr) => {
	return arr?.length < 2;
}

const validCBcategorys = (arr) => {
	return arr?.length < 6;
}

export {
	nameValid,
	emailValid,
	passwordValid,
	passConfValid,
	biosValid,
	titleValid,
	validCBpost,
	validCBcategorys,
	postContentValid
}