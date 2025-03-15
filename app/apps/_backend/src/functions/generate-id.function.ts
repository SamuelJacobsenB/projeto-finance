export const generateId = (day: number) => {
  const id = Math.floor(Math.random() * 899999) * 100 + 10000000;
  return id + day;
};
