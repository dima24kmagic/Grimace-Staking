import { useEffect, useState } from "react";

const useTable = ({
  data,
  page,
  rowsPerPage,
}: {
  data: any[];
  page: number;
  rowsPerPage: number;
}) => {
  const [tableRange, setTableRange] = useState([] as any[]);
  const [slice, setSlice] = useState([] as any[]);

  useEffect(() => {
    const range = calculateRange({ data: data, rowsPerPage: rowsPerPage });
    setTableRange([...range]);

    const slice: any = sliceData({
      data: data,
      page: page,
      rowsPerPage: rowsPerPage,
    });
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};
const calculateRange = ({
  data,
  rowsPerPage,
}: {
  data: any[];
  rowsPerPage: number;
}) => {
  const range: any[] = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = ({
  data,
  page,
  rowsPerPage,
}: {
  data: any[];
  page: number;
  rowsPerPage: number;
}) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};
export default useTable;