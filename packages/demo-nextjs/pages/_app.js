import Link from "next/link";
import "../styles/globals.css";
import "@typeform/embed/build/css/popover.css";
import "@typeform/embed/build/css/popup.css";
import "@typeform/embed/build/css/slider.css";
import "@typeform/embed/build/css/widget.css";
import "@typeform/embed/build/css/sidetab.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="menu">
        <Link href="/">
          <a>widget</a>
        </Link>
        <Link href="/popup">
          <a>popup</a>
        </Link>
        <Link href="/slider">
          <a>slider</a>
        </Link>
        <Link href="/sidetab">
          <a>sidetab</a>
        </Link>
        <Link href="/popover">
          <a>popover</a>
        </Link>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
