import { Pagination } from 'components/atoms';

import { ReactComponent as SortSVG } from 'assets/icons/sort-icon.svg';

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { withPagination } from 'helpers/common';

const {
  table,
  table_header__col,
  table_body,
  table_body__row,
  table_body__col,
  sort_btn,
  loader_animate,
  loader_animate__moving,
} = styles;

export const LoaderTableCol = () => (
  <div className={loader_animate}>
    <div className={loader_animate__moving}></div>
  </div>
);

const DataTable = (props) => {
  const {
    columns = '',
    data = [],
    loading = false,
    alignTop = false,
    paginate = false,
    pageSize = 10,
  } = props;
  const [tableData, setTableData] = useState(data);
  const sampleArray = Array.from({ length: 5 }).map((_, i) => i);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (loading) {
      setTableData(sampleArray);
    } else {
      const fixedData = paginate
        ? withPagination(data, currentPage, pageSize)
        : data;
      setTableData(fixedData);
    }
  }, [loading, data, paginate, pageSize, currentPage]);

  return (
    <section className={table}>
      <header>
        {columns?.map((col, idx) => {
          const equalWidth = 100 / columns?.length;

          return (
            <div
              key={`h-col-${idx}`}
              className={table_header__col}
              style={{ width: col?.width || `${equalWidth}%` }}
            >
              {col?.sortable ? (
                <div className={sort_btn}>
                  <SortSVG />
                </div>
              ) : null}
              <p>{col.title}</p>
            </div>
          );
        })}
      </header>

      <article className={table_body}>
        {tableData?.map((item, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div
              className={table_body__row}
              key={`b-row-${index}`}
              data-even={!loading && isEven}
              data-align-top={alignTop}
            >
              {columns?.map((col, i) => {
                const equalWidth = 100 / columns?.length;
                const columnData = item?.[col?.dataIndex];
                const columnRender = col?.render ? (
                  col.render(columnData, item, index)
                ) : (
                  <p>{columnData || '-'}</p>
                );

                return (
                  <div
                    key={`b-col-${i}`}
                    className={table_body__col}
                    style={{ width: col?.width || `${equalWidth}%` }}
                  >
                    {loading ? <LoaderTableCol /> : columnRender}
                  </div>
                );
              })}
            </div>
          );
        })}
      </article>

      <footer>
        <Pagination
          values={{
            currentPage,
            setCurrentPage,
            pageSize,
            totalPage: Math.ceil(data?.length / pageSize),
          }}
        />
      </footer>
    </section>
  );
};

export default DataTable;
