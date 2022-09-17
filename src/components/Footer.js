import React from "react";
import { Wrap } from "@chakra-ui/react";

const Footer = ({ setting = {} }) => {
  return (
    <Wrap p={2} height="5vh" justify="right">
      {setting["gameTitle"] || "No Setting"}
    </Wrap>
  );
};

export default Footer;
