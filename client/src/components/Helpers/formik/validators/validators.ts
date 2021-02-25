const required = (value: string): undefined | string => {
  if (!value) return "Field is required";
};

const incorrectData = (value: string): undefined | string => {
  if (!value) return "Data is incorrect";
};

const requiredTrim = (value: string): undefined | string => {
  if (value.trim() === "") return "Field is required";
};

const noSpacesStartEnd = (value: string): undefined | string => {
  if (value.trim() && value.length > value.trim().length) {
    return "Field cant start or end with space";
  }
};

const spaceBetween = (value: string): undefined | string => {
  value = value.trim();
  if (value && value.replace(" ", "").length !== value.length) {
    return "No space can be used inside this field";
  }
};

const lettersAndNumbers = (value: string): undefined | string => {
  if (!value.trim().match("^[A-Za-z0-9_*.!, ]*$")) {
    return "Use only english letters, numbers or '_' ',' '.' symbols";
  }
};

const negativePrice = (value: number): undefined | string => {
  if (value < 0) return "Price cant be negative";
};

const correctEmail = (value: string): undefined | string => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "email is incorrect";
  }
};

const passDateStart = (
  value: string,
  secondValue: string
): undefined | string => {
  if (value < secondValue) return "This date is pass";
};

const passDateEnd = (
  value: string,
  secondValue: string = new Date().toDateString().slice(0, 10)
): undefined | string => {
  if (value < secondValue) return "Must be later than start date";
};

const maxLengthValidatorCreator = (maxLength: number) => (
  value: string
): undefined | string => {
  if (value.trim().length > maxLength) {
    return `Max length is ${maxLength} symbols`;
  } else return undefined;
};

const minLengthValidatorCreator = (minLength: number) => (
  value: string
): undefined | string => {
  if (value && value.trim().length < minLength) {
    return `Min length is ${minLength} symbols`;
  }
};

const maxPriceValidatorCreator = (maxPrice: number) => (
  value: number
): undefined | string => {
  if (value > maxPrice) {
    return `Max price is ${maxPrice}`;
  }
};

const validationCreator = (arrayFun: Array<Function>) => (
  value: string,
  secondValue?: string
) => {
  for (const item of arrayFun) {
    if (item(value, secondValue)) {
      return item(value, secondValue);
    }
  }
};

export const validateUserName = validationCreator([
  required,
  requiredTrim,
  spaceBetween,
  lettersAndNumbers,
  minLengthValidatorCreator(3),
  maxLengthValidatorCreator(30),
]);

export const validateEmail = validationCreator([
  required,
  requiredTrim,
  spaceBetween,
  correctEmail,
]);

export const validatePassword = validationCreator([
  required,
  requiredTrim,
  noSpacesStartEnd,
  lettersAndNumbers,
  minLengthValidatorCreator(3),
  maxLengthValidatorCreator(30),
]);

export const simpleValidateNames = validationCreator([
  required,
  requiredTrim,
  lettersAndNumbers,
  minLengthValidatorCreator(2),
  maxLengthValidatorCreator(30),
]);

export const validateDescription = validationCreator([
  required,
  requiredTrim,
  minLengthValidatorCreator(3),
  maxLengthValidatorCreator(80),
]);

export const validatePrice = validationCreator([
  required,
  negativePrice,
  maxPriceValidatorCreator(999999),
]);

export const validateBirthday = validationCreator([
  incorrectData,
  passDateStart,
]);

export const validateDateStart = validationCreator([
  incorrectData,
  passDateStart,
]);
export const validateDateEnd = validationCreator([incorrectData, passDateEnd]);
