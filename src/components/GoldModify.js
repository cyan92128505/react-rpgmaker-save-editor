import React, { useEffect, useState } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const GoldModify = ({ save = {}, onSave = () => {} }) => {
  const [gold, setGold] = useState(0);

  const _handleChange = async (event) => {
    setGold(event.target.value);
  };

  const _hundleSave = () => {
    if (save["party"] && save["party"]["_gold"]) {
      const _target = save;
      _target["party"]["_gold"] = parseInt(gold);
      onSave(_target);
    }
  };

  useEffect(() => {
    if (save["party"] && save["party"]["_gold"]) {
      setGold(save["party"]["_gold"]);
    }
  }, [save]);

  return (
    <InputGroup>
      <InputLeftAddon children="GOLD" />
      <Input
        type="text"
        placeholder="GOLD"
        value={gold}
        onChange={_handleChange}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          colorScheme="gray"
          size="sm"
          icon={<CheckIcon></CheckIcon>}
          onClick={_hundleSave}
        ></IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

export default GoldModify;
