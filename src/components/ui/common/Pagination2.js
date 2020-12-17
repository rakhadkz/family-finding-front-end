import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import ChevronLeftLargeIcon from "@atlaskit/icon/glyph/chevron-left-large";
import ChevronRightLargeIcon from "@atlaskit/icon/glyph/chevron-right-large";
import { Box } from "../atoms";

export const Pagination2 = ({ totalPage, currentPage, setCurrentPage }) => {
  const [pagination, setPagination] = useState();
  useEffect(() => {
    var pages = [];
    for (var i = 1; i <= totalPage; ++i) {
      pages.push(i);
    }
    setPagination(
      pages.map((i) =>
        parseInt(currentPage) === i ? (
          <Button spacing="compact" appearance="primary" isSelected>
            {i}
          </Button>
        ) : (
          <Button
            spacing="compact"
            appearance="subtle"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        )
      )
    );
  }, [totalPage, currentPage]);

  return totalPage ? (
    <Box d="flex" justify="center" w="100%">
      <Button
        spacing="compact"
        appearance="subtle"
        onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
      >
        <ChevronLeftLargeIcon />
      </Button>
      {pagination}
      <Button
        spacing="compact"
        appearance="subtle"
        onClick={() =>
          setCurrentPage((prev) => (totalPage > prev ? prev + 1 : prev))
        }
      >
        <ChevronRightLargeIcon />
      </Button>
    </Box>
  ) : null;
};
