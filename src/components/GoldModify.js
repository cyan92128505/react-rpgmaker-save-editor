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

  const _hundleChange = () => {
    if (save["party"] && save["party"]["_gold"]) {
      const _target = save;
      _target["party"]["_gold"] = gold;
      onSave(_target);
    }
  };

  useEffect(() => {
    console.log(save["party"]);
    if (save["party"] && save["party"]["_gold"]) {
      setGold(save["party"]["_gold"]);
    }
  }, [save]);

  return (
    <InputGroup>
      <InputLeftAddon children="GOLD" />
      <Input type="tel" placeholder="phone number" value={gold} />
      <InputRightElement width="4.5rem">
        <IconButton
          colorScheme="gray"
          size="sm"
          icon={<CheckIcon></CheckIcon>}
          onClick={_hundleChange}
        ></IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

export default GoldModify;
