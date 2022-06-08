import "../src/index"

const loadDataWithPagination = (start, limit) => {
    let localStorage = `?offset=${start}&limit=${limit}`
    getData(API + localStorage);
};

const intersectionObserver = new IntersectionObserver(
    (entries) => {
      loadDataWithPagination(5, 10)
    },
    {
      rootMargin: "0px 0px 100% 0px",
    }
);