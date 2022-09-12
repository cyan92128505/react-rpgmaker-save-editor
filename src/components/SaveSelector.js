import React, { useEffect, useRef, useState } from "react";
import { Flex, Select, Button, InputGroup } from "@chakra-ui/react";
import StorageService from "../services/storage";
import SaveButton from "./SaveButton";

const storageService = new StorageService();

const SaveSelector = ({
  index = 0,
  onSelectIndex = () => {},
  save = {},
  onSave = () => {},
  setting = {},
  onSetting = () => {},
}) => {
  const [keyList, setKeyList] = useState(() => []);
  const inputRef = useRef(null);

  const _reset = () => {
    setKeyList(storageService.getAllFile());
  };

  const _handleChange = (event) => {
    if (!event.target.value || event.target.value.length < 1) {
      return;
    }

    let index = storageService.parseIndexFromKey(event.target.value);
    onSelectIndex(index);
    let json = storageService.load(index);
    onSave(json);
  };

  const _handleClick = () => {
    inputRef.current?.click();
  };

  const _handleSetting = async (value) => {
    if (value.target.files && value.target.files?.[0]) {
      let _rawJSON = await _readFile(value.target.files?.[0]);
      onSetting(JSON.parse(_rawJSON));
    }
  };

  const _readFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
      fileReader.readAsText(file);
    });
  };

  useEffect(_reset, []);

  return (
    <Flex align="center" justify="center">
      <Select placeholder="Select Save" onChange={_handleChange}>
        {keyList.map((keyName) => (
          <option key={keyName.toString()} value={keyName.toString()}>
            {keyName}
          </option>
        ))}
      </Select>
      <Button onClick={_reset}>RESET</Button>
      <SaveButton index={index} save={save} />
      <InputGroup onClick={_handleClick}>
        <input
          onChange={_handleSetting}
          type="file"
          ref={inputRef}
          hidden
        ></input>
        <Button>IMPORT SETTING</Button>
      </InputGroup>
    </Flex>
  );
};

export default SaveSelector;
