import CustomPaginator from "./events/pagination/pagination.js";
import APIHandler from "./repositories/productsAPI.js";
import AppConfig from "./config/app.config.js";

const $observe = document.getElementById('observe');
const $app = document.getElementById("app");

const loadData = async () => {
  CustomPaginator.resetPagination();
  intersectionObserver.unobserve($observe);

  _buildView();
}

const _buildView = () => {
  APIHandler.getData(AppConfig.API)
    .then(productsPreview => $app.appendChild(productsPreview))
    .catch((error) => console.log(error));
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.filter(_isObjectIntersecting).forEach((objectIntersected) => {
      CustomPaginator.forwardPages(1);
      _buildView();
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

const _isObjectIntersecting = (entryObject) => {
  return entryObject.isIntersecting;
};

// RUN
loadData().finally(()=>intersectionObserver.observe($observe));
