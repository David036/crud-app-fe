import { Table as AntdTable } from "antd";
import { TableProps } from "./types";

export default function Table({ columns, data }: TableProps) {
  return <AntdTable columns={columns} dataSource={data} />;
}
