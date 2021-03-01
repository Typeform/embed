import { useEffect } from 'react';
import Head from "next/head";
import { createPopover } from "@typeform/embed";

export default function Popover() {
  useEffect(() => {
    const { unmount } = createPopover("moe6aa", { medium: "demo-test" });

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

        <p>Embed popover &lt;3 Next.js ✨</p>

        <p>
        </p>
      </main>
    </div>
  );
}
