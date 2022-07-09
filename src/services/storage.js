import LZString from "lz-string";

class StorageService {
  _key = "";
  constructor(key) {
    if (key) {
      this._key = key;
    }
  }

  getAllFile = () =>
    Object.keys(window.localStorage)
      .filter((e) => /.*File[0-9]+/.test(e))
      .sort((a, b) => {
        let _aIndex = +`${a.split("File")[1]}`;
        let _bIndex = +`${b.split("File")[1]}`;
        return _aIndex - _bIndex;
      });

  getKey = (index) => {
    if (this._key.length !== 0) {
      ["RPG", this._key, `File${index}`].join(" ");
    }
    return ["RPG", `File${index}`].join(" ");
  };

  parseIndexFromKey = (rawKeyString) => {
    return `${rawKeyString}`.split("File").reverse()[0];
  };

  save = (index, json) => {
    let content = LZString.compressToBase64(JSON.stringify(json));
    window.localStorage.setItem(this.getKey(index), content);
  };

  load = (index) => {
    let _key = this.getKey(index);
    let _raw = window.localStorage.getItem(_key);
    let _rawJSON = LZString.decompressFromBase64(_raw);
    return JSON.parse(_rawJSON);
  };
}

export default StorageService;
