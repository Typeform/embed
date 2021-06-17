import Head from "next/head";
import { Sidetab } from "@typeform/embed-react";

import Sparkle from "../components/sparkle";

export default function SidetabPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1>
          This is an example <a href="https://nextjs.org">Next.js</a> app.
        </h1>

        <p>
          Embed sidetab &lt;3 Next.js <Sparkle />
        </p>

        <Sidetab
          id="moe6aa"
          medium="demo-test"
          hidden={{ foo: "foo value", bar: "bar value" }}
          buttonText="open sidetab"
        />
      </main>
    </div>
  );
}
