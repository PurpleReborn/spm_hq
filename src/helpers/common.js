export const joinClasses = (arrayOfClass = []) => {
  return arrayOfClass.filter(Boolean).join(' ');
};

export const trucateText = (string = '', limit = 20) => {
  return string.slice(0, limit) + '...';
};

export const withPagination = (data = [], currentPage, limit) => {
  const start = currentPage * limit;
  const end = start + limit;

  console.log(data?.slice(start, end), start, end);

  return data?.slice(start, end);
};
