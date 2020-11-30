import StarIcon from "@atlaskit/icon/glyph/star";
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";
import React from "react";
import { Box } from "../atoms";

export const Rating = ({ rating }) => {
  return (
    <Box d="flex">
      {Array(5)
        .fill()
        .map((_, index) =>
          index <= rating - 1 ? <StarFilledIcon /> : <StarIcon />
        )}
    </Box>
  );
};
