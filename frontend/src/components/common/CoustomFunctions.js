import moment from "moment";

export const isEmpty = string => {
  !string || !string.length;
};

export const keyBy = (arr, key) =>
  arr.reduce((acc, el) => {
    acc[el[key]] = el;
    return acc;
  });

export const dateCalendarToSave = fecha_calendar => {
  let miFecha = null;
  if (fecha_calendar) {
    let dia = fecha_calendar.getDate();
    let mes = fecha_calendar.getMonth() + 1;
    let anio = fecha_calendar.getFullYear();
    miFecha = anio + "-" + mes + "-" + dia;
  }
  return miFecha;
};
