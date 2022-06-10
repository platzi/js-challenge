const calculateNextPageIndexes = (pageShown, resultsPerPage, initialOffset) => {
  const nextPage = pageShown + 1;
  return [
    pageShown * resultsPerPage + initialOffset,
    nextPage * resultsPerPage + initialOffset,
  ];
};

const calculatePrevPageIndexes = (pageShown, resultsPerPage, initialOffset) => {
  let previusPage = pageShown - 1;
  if (previusPage < 0) previusPage = 0;
  return [
    previusPage * resultsPerPage + initialOffset,
    pageShown * resultsPerPage + initialOffset,
  ];
};

const forwardPages = (number) => {
  const nextPage = Number.parseInt(localStorage.getItem("currentPage")) + number;
  localStorage.setItem("currentPage", nextPage);
};

const goBackPages = (number) => {
  const nextPage = Number.parseInt(localStorage.getItem("currentPage")) - number;
  localStorage.setItem("currentPage", nextPage);
};

const resetPagination = () => {
  localStorage.setItem("currentPage", 0);
};

const getCurrentPage = () => {
  return Number.parseInt(localStorage.getItem("currentPage"));
};

export default {
  calculateNextPageIndexes,
  calculatePrevPageIndexes,
  forwardPages,
  goBackPages,
  resetPagination,
  getCurrentPage,
};
