export const timeConverter = (UNIX_timestamp) => {
  const time = new Date(UNIX_timestamp * 1000);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  return date + '/' + month + '/' + year;
};
