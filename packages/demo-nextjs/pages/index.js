import Head from "next/head";
import { useEffect, useRef } from "react";
import { createWidget } from "@typeform/embed";

export default function Home() {
  const container = useRef();

  const widgetContainerStyle = {
    width: 500,
    height: 400,
    margin: "20px auto",
  };

  // this is not ideal and we recommend using embed-react lib once it is ready :)
  useEffect(() => {
    createWidget("moe6aa", {
      container: container.current,
      medium: "demo-test",
      transitiveSearchParams: ["foo", "bar"],
      hidden: { foo: "foo value", bar: "bar value" },
    });
  }, [container.current]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1>
          This is an example <a href="https://nextjs.org">Next.js</a> app.
        </h1>

        <p>Embed widget &lt;3 Next.js ✨</p>

        <div style={widgetContainerStyle} ref={container} />
      </main>
    </div>
  );
}
