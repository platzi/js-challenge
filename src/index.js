import CustomPaginator from "./events/pagination/pagination.js";
import APIHandler from "./repositories/productsAPI.js";
import AppConfig from "./config/app.config.js";

const $observe = document.getElementById("observe");
const $app = document.getElementById("app");

const loadData = async () => {
  CustomPaginator.resetPagination();
  $observe.className = "display:none";

  _buildView();
};

const _buildView = () => {
  APIHandler.getData(AppConfig.API)
    .then((productsPreview) => {
      $app.appendChild(productsPreview);
      if (productsPreview.childElementCount > 0 && productsPreview.childElementCount < AppConfig.resultsPerPage) {
        $app.append(_buildEndReachedMsg());
        intersectionObserver.unobserve($observe);
      }
    })
    .catch((error) => console.log(error));
};

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

const _buildEndReachedMsg = () => {
  const msgContainer = document.createElement("div");
  msgContainer.innerHTML = `<br><br><h3>Todos los productos Obtenidos</h3>`;
  return msgContainer;
};

const _isObjectIntersecting = (entryObject) => {
  return entryObject.isIntersecting;
};

// RUN
loadData().finally(() => {
  $observe.className = "display:block";
  intersectionObserver.observe($observe)
  });
