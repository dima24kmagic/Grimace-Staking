import { useEffect, useState } from "react"

const sliceData = ({
  data,
  page,
  rowsPerPage,
}: {
  data: any[]
  page: number
  rowsPerPage: number
}) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
}

const calculateRange = ({
  data,
  rowsPerPage,
}: {
  data: any[]
  rowsPerPage: number
}) => {
  const range: any[] = []
  const num = Math.ceil(data.length / rowsPerPage)
  for (let i = 1; i <= num; i++) {
    range.push(i)
  }
  return range
}

const useTable = ({
  data,
  page,
  rowsPerPage,
}: {
  data: any[]
  page: number
  rowsPerPage: number
}) => {
  const [tableRange, setTableRange] = useState([] as any[])
  const [slice, setSlice] = useState([] as any[])

  useEffect(() => {
    const range = calculateRange({ data, rowsPerPage })
    setTableRange([...range])

    const slice: any = sliceData({
      data,
      page,
      rowsPerPage,
    })
    setSlice([...slice])
  }, [data, setTableRange, page, rowsPerPage])

  return { slice, range: tableRange }
}

export default useTable
