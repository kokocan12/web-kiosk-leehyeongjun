export function getYesterdayString() {
  const dt = new Date();
  dt.setDate(dt.getDate() - 1);

  const fullYear = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const date = dt.getDate();

  return `${fullYear}-${month >= 10 ? month : `0${month}`}-${date}`;
}

export function getYesterdayMin() {
  const dt = new Date(`${getYesterdayString()} 00:00:00`);

  return dt;
}

export function getYesterdayMax() {
  const dt = new Date(`${getYesterdayString()} 23:59:59`);

  return dt;
}

export function getTodayString() {
  const dt = new Date();

  const fullYear = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const date = dt.getDate();

  return `${fullYear}-${month >= 10 ? month : `0${month}`}-${date}`;
}

export function getTodayMin() {
  const dt = new Date(`${getTodayString()} 00:00:00`);

  return dt;
}

export function getTodayMax() {
  const dt = new Date(`${getTodayString()} 23:59:59`);

  return dt;
}
