'use client';
import Link from "next/link";
import { useParams } from 'next/navigation'

export default function Pagination({pages}) {
  if (typeof pages === 'string') {
    pages = parseInt(pages);
  }
  const pageList = [];
  for (let i = 1; i <= pages; i++) {
    pageList.push(i);
  }
  const params = useParams();
  return (
    <div className="pages-container">
      {pageList.map(page => {
        return (
          <Link href={`./${page}`} key={page} className={`page-number ${params.page === page.toString() && 'active-page-number'}`}>
            {page}
          </Link>
        )
      })}
    </div>
  )
}
