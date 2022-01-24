import ReactPaginate from 'react-paginate';

import { ReactComponent as NextSVG } from 'assets/icons/chevron-right-icon.svg';
import { ReactComponent as PrevSVG } from 'assets/icons/chevron-left-icon.svg';
import { ReactComponent as MoreSVG } from 'assets/icons/more-icon.svg';

import styles from './styles.module.scss';

const {
  pagination,
  pagination_page,
  pagination_active,
  pagination_page__btn_prev,
  pagination_page__btn_next,
} = styles;

const Pagination = (props) => {
  const {
    values = {
      currentPage: 0,
      setCurrentPage: () => {},
      pageSize: 10,
      totalPage: 1,
    },
  } = props;

  return (
    <ReactPaginate
      breakLabel={<MoreSVG width={16} height={16} />}
      nextLabel={<NextSVG width={16} height={16} />}
      onPageChange={(p) => values.setCurrentPage(p?.selected)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      pageCount={values?.totalPage}
      previousLabel={<PrevSVG width={16} height={16} />}
      renderOnZeroPageCount={null}
      containerClassName={pagination}
      pageClassName={pagination_page}
      pageLinkClassName={pagination_page}
      activeClassName={pagination_active}
      previousClassName={pagination_page__btn_prev}
      previousLinkClassName={pagination_page__btn_prev}
      nextClassName={pagination_page__btn_next}
      nextLinkClassName={pagination_page__btn_next}
    />
  );
};

export default Pagination;
