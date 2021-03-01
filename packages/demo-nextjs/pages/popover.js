import Head from "next/head";
import { createPopover } from "@typeform/embed";

export default function Popover() {
  const openPopover = () => {
    createPopover("moe6aa", { element: document.getElementById('popover-icon'), medium: "demo-test" }).open();
  };

  const popoverButtonStyle = {
    width: '54px',
    height: '54px',
    position: 'fixed',
    boxShadow: '0px 2px 12px rgb(0 0 0 / 6%) 0px 2px 4px rgb(0 0 0 / 8%)',
    right: '26px',
    bottom: '26px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    background: '#3A7685',
    overflow: 'hidden',
    lineHeight: 0,
  }

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
          <button style={popoverButtonStyle} onClick={openPopover}><div id='popover-icon'>icon</div></button>
        </p>
      </main>
    </div>
  );
}
