import Head from "next/head";
import { createPopup, createSlider } from "@typeform/embed";

export default function Popup() {
  const openPopup = () => {
    createPopup("moe6aa", { medium: "demo-test" }).open();
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

        <p>Embed popup &lt;3 Next.js ✨</p>

        <p>
          <button onClick={openPopup}>open popup</button>
        </p>
      </main>
    </div>
  );
}
