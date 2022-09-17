import React from "react";
import { useToast, IconButton } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
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
      <IconButton
        variant="outline"
        colorScheme="gray"
        icon={<CheckCircleIcon></CheckCircleIcon>}
        onClick={_onClick}
        aria-label="SAVE"
      ></IconButton>
    </>
  );
};

export default SaveButton;
