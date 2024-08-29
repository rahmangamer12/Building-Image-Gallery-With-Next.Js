import Link from "next/link";

type Props = {
  topic: string,
  page: string | undefined,
  nextPage: string | null,
  prevPage: string | null,
};

export default function Footer({ topic, page, nextPage, prevPage }: Props) {
  if (!prevPage && !nextPage) return null;

  const pageNums: number[] = [];
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      pageNums.push(i);
    }
  }

  const nextPageArea = nextPage ? (
    <Link href={`/results/${topic}/${nextPage}`} className={!prevPage ? 'mx-auto' : ''}>
      {!prevPage ? 'more' : null} &gt;&gt;&gt;
    </Link>
  ) : null;

  const prevPageArea = prevPage ? ( // Ensure this checks prevPage, not nextPage
    <>
      <Link href={`/results/${topic}/${prevPage}`} className={!nextPage ? 'mx-auto' : ''}>
        &lt;&lt;&lt; {!nextPage ? 'more' : null}
      </Link>

      {pageNums.map((num, i) =>
        page && num === parseInt(page) ? (
          <span key={i}>{num}</span>
        ) : (
          <Link href={`/results/${topic}/${num}`} key={i} className="underline">
            {num}
          </Link>
        )
      )}
    </>
  ) : null;

  return (
    <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">
      {prevPageArea}
      {nextPageArea}
    </footer>
  );
}
