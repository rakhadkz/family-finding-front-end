import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftLargeIcon from "@atlaskit/icon/glyph/chevron-left-large";
import ChevronRightLargeIcon from "@atlaskit/icon/glyph/chevron-right-large";
import { Box } from "../atoms";

export const Pagination = ({ fetch, currentPage }) => {
  const history = useHistory();
  const [pagination, setPagination] = useState();
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    fetch().then((data) => {
      setTotalPage(data.num_pages);
      var pages = [];
      for (var i = 1; i <= data.num_pages; ++i) {
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
              onClick={() => history.push(`?page=${i}`)}
            >
              {i}
            </Button>
          )
        )
      );
    });
  }, [currentPage]);

  return (
    <Box d="flex" justify="center" w="100%">
      <Button
        spacing="compact"
        appearance="subtle"
        onClick={() =>
          currentPage > 1 && history.push(`?page=${parseInt(currentPage) - 1}`)
        }
      >
        <ChevronLeftLargeIcon />
      </Button>
      {pagination}
      <Button
        spacing="compact"
        appearance="subtle"
        onClick={() =>
          totalPage > parseInt(currentPage) &&
          history.push(`?page=${parseInt(currentPage) + 1}`)
        }
      >
        <ChevronRightLargeIcon />
      </Button>
    </Box>
  );
};
