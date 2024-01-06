'use client';
import Link from "next/link";
import { useParams } from 'next/navigation'


export default function Pagination({pages}) {
  if (typeof pages === 'string') {
    pages = parseInt(pages);
  }
  const currentPage = parseInt(useParams().page);
  const pageList = [];
  if (pages <= 10) {
    // If total pages are 10 or less, show all pages
    for (let i = 1; i <= pages; i++) {
      pageList.push(i);
    }
  } else {
    // If total pages are more than 10
    pageList.push(1); // Always include the first page

    let start = Math.max(2, currentPage - 1); // Start from one page before the current, but not less than 2
    let end = Math.min(currentPage + 7, pages - 1); // Show next 7 pages, but not beyond the second last page

    if (currentPage > 5) {
      pageList.push('...'); // Add ellipsis if there's a gap between 1 and start
    }

    for (let i = start; i <= end; i++) {
      pageList.push(i);
    }

    if (currentPage < pages - 5) {
      pageList.push('...'); // Add ellipsis if there's a gap between end and last page
    }

    pageList.push(pages); // Always include the last page
  }
  return (
    <div className="pages-container">
      {pageList.map(page => {
        return (
          <Link href={page === '...' ? `./` : `./${page}`} key={page} className={`page-number ${currentPage === page && 'active-page-number'}`}>
            {page}
          </Link>
        )
      })}
    </div>
  )
}
