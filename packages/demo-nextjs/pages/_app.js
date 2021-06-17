import Link from "next/link";
import PropTypes from "prop-types";
import "../styles/globals.css";

// import CSS for vanilla lib
import "@typeform/embed/build/css/popup.css";
import "@typeform/embed/build/css/widget.css";

function MyApp({ Component, pageProps }) {
  const links = {
    "/": "widget",
    "/popup": "popup",
    "/slider": "slider",
    "/sidetab": "sidetab",
    "/popover": "popover",
    "/vanilla": "vanilla library in react",
  };

  return (
    <>
      <div className="menu">
        {Object.keys(links).map((path) => (
          <Link key={path} href={path}>
            <a href={path}>{links[path]}</a>
          </Link>
        ))}
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
