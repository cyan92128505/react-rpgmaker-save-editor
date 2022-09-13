import React, { useCallback, useEffect, useRef, useState } from "react";
import { Flex, Select, Button, InputGroup, Box } from "@chakra-ui/react";
import StorageService from "../services/storage";
import SaveButton from "./SaveButton";

const storageService = new StorageService();
const settingKey = "editor_setting";

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

  const _reset = useCallback(() => {
    setKeyList(storageService.getAllFile());
  }, []);

  const _applySetting = useCallback(() => {
    const _setting = storageService.rawLoad(settingKey);
    if (_setting) {
      onSetting(_setting);
    }
  }, [onSetting]);

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
      let _json = JSON.parse(_rawJSON);
      onSetting(JSON.parse(_rawJSON));
      storageService.rawSave(settingKey, _json);
    }
  };

  const _readFile = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
      fileReader.readAsText(file);
    });

  useEffect(() => {
    _reset();
    _applySetting();
  }, [_reset, _applySetting]);

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
      <Box>
        <InputGroup onClick={_handleClick}>
          <input
            onChange={_handleSetting}
            type="file"
            ref={inputRef}
            hidden
          ></input>
          <Button>IMPORT SETTING</Button>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default SaveSelector;
