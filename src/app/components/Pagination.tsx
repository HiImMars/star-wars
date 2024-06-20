import { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

const DEFAULT_PAGE_CLASSNAME = "text-lg";
const DEFAULT_PAGE_LINK_CLASSNAME =
  "px-3 py-2 border border-opacity-50 rounded-lg hover:bg-orange-base hover:text-white hover:border-orange-base hover:opacity-100";
const DEFAULT_DISABLED_LINK_CLASSNAME =
  "px-3 py-2 text-lg border border-opacity-50 rounded-lg hover:bg-orange-base hover:text-white hover:border-orange-base";
const DEFAULT_DISABLED_NAV_LINK_CLASSNAME = "opacity-50 pointer-events-none";

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
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 3,
  setPage,
}) => {
  const currentPage = page - 1;

  const onPageChange: ReactPaginateProps["onPageChange"] = ({ selected }) =>
    setPage(selected + 1);

  return (
    <ReactPaginate
      containerClassName="flex items-center gap-3"
      pageClassName={DEFAULT_PAGE_CLASSNAME}
      pageLinkClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      breakClassName={DEFAULT_PAGE_CLASSNAME}
      breakLinkClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      activeClassName="default:opacity-100"
      activeLinkClassName="bg-orange-base text-white border-none"
      previousLinkClassName={DEFAULT_DISABLED_LINK_CLASSNAME}
      nextLinkClassName={DEFAULT_DISABLED_LINK_CLASSNAME}
      disabledLinkClassName={DEFAULT_DISABLED_NAV_LINK_CLASSNAME}
      initialPage={currentPage}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onPageChange}
      previousLabel={"prev"}
      nextLabel={"next"}
    />
  );
};
