import Link from "next/link";
import PropTypes from "prop-types";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="menu">
        <Link href="/">
          <a href="/">widget</a>
        </Link>
        <Link href="/popup">
          <a href="/popup">popup</a>
        </Link>
        <Link href="/slider">
          <a href="/slider">slider</a>
        </Link>
        <Link href="/sidetab">
          <a href="/sidetab">sidetab</a>
        </Link>
        <Link href="/popover">
          <a href="/popover">popover</a>
        </Link>
      </div>
      <Component {...pageProps} />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
