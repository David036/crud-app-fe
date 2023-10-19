export interface TableProps {
  columns: any;
  data: any;
  setLimit: (limit: number) => void;
  setCurrentPage: (page: number) => void;
}
