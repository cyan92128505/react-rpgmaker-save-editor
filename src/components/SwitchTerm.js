import React, { useEffect, useState } from "react";
import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";

const SwitchTerm = ({
  save = {},
  onSave = () => {},
  setting = {},
  index = 0,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (value) => {
    setValue(value);
    let _target = save;
    const _valueDict = {
      true: true,
      false: false,
      null: null,
    };
    _target["switches"]["_data"]["@a"][index] = _valueDict[value];
    onSave(_target);
  };

  useEffect(() => {
    if (setting["switches"] && save["switches"]) {
      setValue(`${save["switches"]["_data"]["@a"][index]}`);
    }
  }, [save, setting, index]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={2}>
      <Stack direction="row">
        <Box bg="gray.100" borderRadius="lg">
          {setting["switches"][index]}
        </Box>
        <Box>
          <RadioGroup onChange={handleChange} value={value}>
            <Stack direction="row">
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
              <Radio value="null">Null</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Stack>
    </Box>
  );
};

export default SwitchTerm;
