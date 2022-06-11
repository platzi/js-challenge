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
  const nextPage = Number.parseInt(localStorage.getItem("pagination")) + number;
  localStorage.setItem("pagination", nextPage);
};

const goBackPages = (number) => {
  const nextPage = Number.parseInt(localStorage.getItem("pagination")) - number;
  localStorage.setItem("pagination", nextPage);
};

const resetPagination = () => {
  localStorage.clear();
  localStorage.setItem("pagination", 0);
};

const getCurrentPage = () => {
  return Number.parseInt(localStorage.getItem("pagination"));
};

export default {
  calculateNextPageIndexes,
  calculatePrevPageIndexes,
  forwardPages,
  goBackPages,
  resetPagination,
  getCurrentPage,
};
