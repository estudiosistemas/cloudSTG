import moment from "moment";

export const isEmpty = (string) => {
  !string || !string.length;
};

export const keyBy = (arr, key) =>
  arr.reduce((acc, el) => {
    acc[el[key]] = el;
    return acc;
  });

export const dateCalendarToSave = (fecha_calendar) => {
  let miFecha = null;
  if (fecha_calendar) {
    let dia = fecha_calendar.getDate();
    let mes = fecha_calendar.getMonth() + 1;
    let anio = fecha_calendar.getFullYear();
    miFecha = anio + "-" + mes + "-" + dia;
  }
  return miFecha;
};

export function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}
