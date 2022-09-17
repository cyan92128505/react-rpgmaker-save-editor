import React, { useEffect, useState, useCallback } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { isEqual } from "underscore";

const VariableTerm = ({
  save = {},
  onSave = () => {},
  setting = {},
  index = 0,
}) => {
  const [value, setValue] = useState("");
  const [olderValue, setOlderValue] = useState("");
  const [saveState, setSaveState] = useState("gary");

  const _handleStateChange = useCallback(() => {
    try {
      let _target = JSON.parse(value);
      let _source = JSON.parse(olderValue);

      setSaveState(isEqual(_target, _source) ? "gary" : "blue");
    } catch (error) {}
  }, [value, olderValue]);

  const _handleChange = async (event) => {
    setValue(event.target.value);
  };

  const _handleSave = () => {
    let _target = save;
    let _numberValue = parseInt(value);

    _target["variables"]["_data"]["@a"][index] = JSON.parse(
      _numberValue | value
    );

    setOlderValue(_target["variables"]["_data"]["@a"][index]);
    onSave(_target);
  };

  useEffect(() => {
    if (
      setting["variables"] &&
      save["variables"] &&
      save["variables"]["_data"]["@a"][index]
    ) {
      let _value = JSON.stringify(save["variables"]["_data"]["@a"][index]);
      setValue(_value);
      setOlderValue(_value);
    }
  }, [save, setting, index]);

  useEffect(() => {
    _handleStateChange();
  }, [_handleStateChange, value, olderValue]);

  return (
    <InputGroup>
      <InputLeftAddon children={setting["variables"][index]} />
      <Input
        type="text"
        placeholder="null"
        onChange={_handleChange}
        value={value}
      />
      <InputRightAddon>
        <IconButton
          colorScheme={saveState}
          onClick={_handleSave}
          icon={<CheckIcon></CheckIcon>}
        ></IconButton>
      </InputRightAddon>
    </InputGroup>
  );
};

export default VariableTerm;
