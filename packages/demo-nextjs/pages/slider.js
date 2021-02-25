import Head from "next/head";
import { createPopup, createSlider } from "@typeform/embed";

export default function Slider() {
  const openSlider = (position) => {
    createSlider("moe6aa", { position, medium: "demo-test" }).open();
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1>
          This is an example <a href="https://nextjs.org">Next.js</a> app.
        </h1>

        <p>Embed slider &lt;3 Next.js ✨</p>

        <p>
          <button id="button" onClick={() => openSlider("right")}>
            open slider (right)
          </button>
        </p>

        <p>
          <button id="button" onClick={() => openSlider("left")}>
            open slider (left)
          </button>
        </p>
      </main>
    </div>
  );
}
