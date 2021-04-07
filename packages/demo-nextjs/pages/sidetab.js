import { useEffect } from "react";
import Head from "next/head";
import { createSidetab } from "@typeform/embed";

export default function Sidetab() {
  useEffect(() => {
    const { unmount } = createSidetab("moe6aa", {
      medium: "demo-test",
      buttonText: "open sidetab",
      hidden: {
        foo: "foo value",
        bar: "bar value",
      },
    });

    return () => unmount();
  }, []);

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
      </main>
    </div>
  );
}
