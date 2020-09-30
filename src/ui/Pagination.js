import Link from 'next/link';

const Pagination = ({ category, pageIndex, numPages }) => {
  // 現在のページの両隣にいくつページリンクを表示するか
  const pageCandidate = 2;

  const categoryPath = category ? `/category/${category}` : '';
  const categoryDRoute = categoryPath ? '/category/[category]' : '';

  let pageNumArr = new Array(Math.min(pageCandidate * 2 + 1, numPages)).fill(0).map((num, i) => i + 1);
  if (numPages <= 1) {
    return <></>;
  } else if (numPages <= pageCandidate * 2 + 1) {
    // ページ数が少ない
    pageNumArr = pageNumArr.slice(0, numPages);
  } else if (pageIndex + 1 > numPages - pageCandidate) {
    // ページの終わりが近い
    pageNumArr = pageNumArr.map(pageNum => pageNum + numPages - pageCandidate * 2 - 1);
  } else if (pageIndex > pageCandidate) {
    // ページの始まりにも終わりにも近くない
    pageNumArr = pageNumArr.map(pageNum => pageNum + pageIndex - pageCandidate);
  }

  return (
    <ul className="l_flex list_no_buret pagination">
      {/* トップに戻る */}
      {pageIndex > pageCandidate && (
        <li className="pagination__item" key="prev_top">
          <Link href={categoryPath || '/'}>
            <a className="weak_shadow pagination__link">
              <i className="icon icon__prev_top_arrow"></i>
            </a>
          </Link>
        </li>
      )}
      {/* 前のページに戻る */}
      {!!pageIndex && (
        <li className="pagination__item" key="prev">
          <Link href={categoryDRoute + (pageIndex === 1 ? '/' : '/page/[page]')} as={categoryPath + (pageIndex === 1 ? '/' : `/page/${pageIndex}`)}>
            <a className="weak_shadow pagination__link">
              <i className="icon icon__prev_arrow" />
            </a>
          </Link>
        </li>
      )}
      {pageNumArr.map(pageNum => {
        if (pageIndex + 1 === pageNum) {
          /* 現在のページ */
          return (
            <li className="pagination__item" key={pageNum}>
              <span className="weak_shadow pagination__current">{pageNum}</span>
            </li>
          );
        } else {
          /* ページリンク */
          return (
            <li className="pagination__item" key={pageNum}>
              <Link href={categoryDRoute + (pageNum === 1 ? '/' : '/page/[page]')} as={categoryPath + (pageNum === 1 ? '/' : `/page/${pageNum}`)}>
                <a className="weak_shadow pagination__link__num">{pageNum}</a>
              </Link>
            </li>
          );
        }
      })}
      {/* 次のページに進む */}
      {pageIndex + 1 !== numPages && (
        <li className="pagination__item" key="next">
          <Link href={categoryDRoute + '/page/[page]'} as={categoryPath + `/page/${pageIndex + 2}`}>
            <a className="weak_shadow pagination__link">
              <i className="icon icon__next_arrow" />
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
