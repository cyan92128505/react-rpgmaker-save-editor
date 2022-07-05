import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import StorageService from "../services/storage";

const storageService = new StorageService();

const SaveButton = ({ save = {}, index = 0 }) => {
  const toast = useToast();

  const _onClick = () => {
    if (index < 1) {
      return;
    }

    storageService.save(index, save);
    toast({
      title: `Save ${index} Success`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button colorScheme="teal" variant="link" onClick={_onClick}>
        Save
      </Button>
    </>
  );
};

export default SaveButton;
