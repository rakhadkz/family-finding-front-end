const tableData = (data, cells) => {
  var out = data.map((item, index) => {
    return {
      key: index,
      cells: fillCells(item, cells),
    };
  });
  console.log("out", out);
  return out;
};

const fillCells = (data, cells) => {
  return cells.map((item) => {
    return {
      key: item.key,
      content: data[item.key] ? data[item.key] : "",
    };
  });
};

export { tableData };
