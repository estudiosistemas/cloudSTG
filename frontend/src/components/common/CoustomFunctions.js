export const isEmpty = string => !string || !string.length;

export const keyBy = (arr, key) =>
  arr.reduce((acc, el) => {
    acc[el[key]] = el;
    return acc;
  });
