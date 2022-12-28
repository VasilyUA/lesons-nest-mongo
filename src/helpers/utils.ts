export const getKeyByValue = (myEnum, enumValue): string => {
	return Object.keys(myEnum).find(key => myEnum[key] === enumValue);
};
