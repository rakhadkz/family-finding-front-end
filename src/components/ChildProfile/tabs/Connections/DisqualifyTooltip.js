import React from "react";
import { Box, Rectangle, Spacing, Title } from "../../../ui/atoms";
import { FitScore } from "../../../ui/molecules";
import { Avatar } from "../../../ui/molecules/Avatar";
import { CustomTooltip } from "../../index";
export const DisqualifyTooltip = ({ contact, reason }) => {
  return (
    <CustomTooltip>
      <Spacing m={{ t: "0px" }}>
        <Rectangle style={{ width: "410px", border: "1px solid #dfe1e6" }}>
          <Box d="flex">
            <Box d="flex" direction="column" align="center" mr="16px">
              <Avatar
                name={`${contact?.first_name} ${contact?.last_name}`}
                size="slarge"
              />
              <Spacing m={{ t: "20px" }}>
                <FitScore score={3} />
              </Spacing>
              <p>Link Score</p>
            </Box>
            <Box>
              <Title size="18px">{`${contact?.first_name} ${contact?.last_name}`}</Title>
              <span>{contact?.relationship}</span>
              <Box mt="12px">
                <Box d="f">
                  <b style={{ marginRight: "7px" }}>Email:</b>
                  {contact?.email}
                  {"    "} <b style={{ marginRight: "7px" }}>Phone:</b>
                  {contact?.phone}
                </Box>
              </Box>
              <Box d="f">
                <b style={{ marginRight: "5px" }}>Disqualify Reason:</b>
                {reason}
              </Box>
            </Box>
          </Box>
        </Rectangle>
      </Spacing>
    </CustomTooltip>
  );
};
