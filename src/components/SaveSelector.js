import React, { useEffect, useState } from "react";
import { Flex, Select, Button } from "@chakra-ui/react";
import StorageService from "../services/storage";

const storageService = new StorageService();

const SaveSelector = ({ onSave = () => {}, onSelectIndex = () => {} }) => {
  const [keyList, setKeyList] = useState(() => []);
  const _reset = () => {
    setKeyList(storageService.getAllFile());
  };
  useEffect(_reset, []);

  const _handleChange = (event) => {
    if (!event.target.value || event.target.value.length < 1) {
      return;
    }

    let index = storageService.parseIndexFromKey(event.target.value);
    onSelectIndex(index);
    let json = storageService.load(index);
    onSave(json);
  };

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
    </Flex>
  );
};

export default SaveSelector;
