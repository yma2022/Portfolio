import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="page-shell inner-page not-found"
    >
      <p className="eyebrow">404 / Off the map</p>
      <h1>
        This route
        <br />
        ends here.
      </h1>
      <p className="page-lede">
        The page you’re looking for isn’t at this address. There’s more to
        explore back in the project atlas.
      </p>
      <Link className="primary-link" href="/work/">
        Back to work <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
