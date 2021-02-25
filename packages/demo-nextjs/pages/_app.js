import Link from "next/link";
import "../styles/globals.css";
import "@typeform/embed/build/css/popup.css";
import "@typeform/embed/build/css/slider.css";
import "@typeform/embed/build/css/widget.css";

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
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
