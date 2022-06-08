class Data {
  static saveData(data = {}, name = "") {
    localStorage.setItem(name, JSON.stringify(data));
    //console.log(localStorage);
  }
  static loadData(name = "") {
    return JSON.parse(localStorage.getItem(name));
  }
  static removeData(name = "") {
    localStorage.removeItem(name);
  }
  static clear() {
    localStorage.clear();
  }
}

export default Data;
