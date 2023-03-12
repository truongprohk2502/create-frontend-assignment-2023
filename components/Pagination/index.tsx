"use client";

import { FC } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import styles from "./Pagination.module.css";
import queryString from "query-string";

interface IProps {
  pageCount: number;
  baseUrl: string;
  params?: any;
}

const Pagination: FC<IProps> = ({ pageCount, baseUrl, params = {} }) => {
  const router = useRouter();

  const handleChangePage = (page: number) => {
    const queryParams: any = {
      page,
    };
    const limit = parseInt(params.limit);
    if (limit && limit >= 0) {
      queryParams.limit = limit;
    }
    const queryStr = queryString.stringify(queryParams);
    router.push(queryStr ? `${baseUrl}?${queryStr}` : baseUrl);
  };

  return (
    <div className={styles.mainContainer}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(page) => handleChangePage(page.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={() => {}}
        className={styles.container}
        breakClassName={styles.breakLine}
        pageClassName={styles.pageButton}
        pageLinkClassName={styles.pageButtonLink}
        previousClassName={styles.previousButton}
        previousLinkClassName={styles.pageButtonLink}
        nextClassName={styles.nextButton}
        nextLinkClassName={styles.pageButtonLink}
        activeClassName={styles.activeButton}
        disabledClassName={styles.disabledButton}
      />
    </div>
  );
};

export default Pagination;
