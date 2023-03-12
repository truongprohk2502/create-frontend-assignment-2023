import styles from "./Table.module.css";

type ColumnDefinitionType<T> = {
  key: keyof T;
  header: string;
  minWidth?: number | string;
};

type TableProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T>>;
  caption?: string;
  rowKey?: string;
  offset?: number;
  isIndexed?: boolean;
};

const Table = <T extends object>({
  data,
  columns,
  caption,
  rowKey,
  offset = 0,
  isIndexed,
}: TableProps<T>): JSX.Element => {
  const dataColumns = isIndexed
    ? [{ header: "No.", key: "no.", minWidth: "3rem" }, ...columns]
    : columns;

  const dataSource = isIndexed
    ? data.map((item, index) => {
        // @ts-ignore
        item["no."] = offset + index;
        return item;
      })
    : data;

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {dataColumns.map((item, index) => (
              <th key={index} style={{ minWidth: item.minWidth || "auto" }}>
                {item.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.length ? (
            dataSource.map((item, index) => (
              // @ts-ignore
              <tr key={rowKey ? item[rowKey] : index}>
                {dataColumns.map((col, colIndex) => (
                  // @ts-ignore
                  <td key={colIndex}>{item[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={dataColumns.length} className={styles.emptyRow}>
                Empty data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
