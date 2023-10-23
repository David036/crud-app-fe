import { Table as AntdTable, TablePaginationConfig } from "antd";
import { TableProps } from "./types";

export default function Table({
  columns,
  data,
  setLimit,
  setCurrentPage,
  countOfPage,
}: TableProps) {
  return (
    <AntdTable
      pagination={{
        showSizeChanger: true,
        total: countOfPage,
      }}
      onChange={(e: TablePaginationConfig): void => {
        setCurrentPage(e.current as any);
        setLimit(e.pageSize as any);
      }}
      columns={columns}
      dataSource={data}
    />
  );
}
