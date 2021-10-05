export const calculateAge = (birthDate: any): Number => {
  let years!: number;

  const currYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const yearDiff = currYear - birthYear;

  const currMonth = new Date().getMonth() + 1;
  const birthMonth = birthDate.getMonth() + 1;
  const monthDiff = currMonth - birthMonth;

  if (monthDiff < 0) {
    years = yearDiff - 1;
  } else {
    years = yearDiff;
  }

  return years;
};
