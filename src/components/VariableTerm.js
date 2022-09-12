import React, { useEffect, useState } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

const VariableTerm = ({
  save = {},
  onSave = () => {},
  setting = {},
  index = 0,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    let _target = save;
    let _numberValue = parseInt(event.target.value);

    _target["variables"]["_data"]["@a"][index] =
      _numberValue | event.target.value;
    onSave(_target);
  };

  useEffect(() => {
    if (setting["variables"] && save["variables"]) {
      setValue(save["variables"]["_data"]["@a"][index]);
    }
  }, [save, setting, index]);

  return (
    <InputGroup>
      <InputLeftAddon children={setting["variables"][index]} />
      <Input
        type="text"
        placeholder="null"
        onChange={handleChange}
        value={value}
      />
    </InputGroup>
  );
};

export default VariableTerm;
