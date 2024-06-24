import { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import PrevIcon from "../../assets/icons/prev.svg";
import NextIcon from "../../assets/icons/next.svg";

const DEFAULT_PAGE_CLASSNAME = "text-lg";
const DEFAULT_PAGE_LINK_CLASSNAME =
  "px-3 py-2 border border-opacity-50 rounded-lg hover:bg-white hover:text-orangeAccent hover:border-orangeAccent hover:opacity-100";
const DEFAULT_DISABLED_LINK_CLASSNAME = "px-2 py-2";
const DEFAULT_DISABLED_NAV_LINK_CLASSNAME = "opacity-30 pointer-events-none";

interface Props {
  page: number;
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  setPage: (value: number) => void;
}

export const Pagination: FC<Props> = ({
  page,
  pageCount,
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 0,
  setPage,
}) => {
  const currentPage = page - 1;

  const onPageChange: ReactPaginateProps["onPageChange"] = ({ selected }) =>
    setPage(selected + 1);

  return (
    <ReactPaginate
      containerClassName="flex items-center gap-2"
      pageClassName={DEFAULT_PAGE_CLASSNAME}
      pageLinkClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      breakClassName={DEFAULT_PAGE_CLASSNAME}
      breakLinkClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      activeClassName="default:opacity-100"
      activeLinkClassName="bg-white text-orangeAccent border-orangeAccent"
      previousLinkClassName={DEFAULT_DISABLED_LINK_CLASSNAME}
      nextLinkClassName={DEFAULT_DISABLED_LINK_CLASSNAME}
      disabledLinkClassName={DEFAULT_DISABLED_NAV_LINK_CLASSNAME}
      initialPage={currentPage}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onPageChange}
      previousLabel={<PrevIcon width="26" height="26" />}
      nextLabel={<NextIcon width="26" height="26" />}
    />
  );
};
