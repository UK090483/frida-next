import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-55149650-1`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-55149650-1', {
              page_path: window.location.pathname,
            });
          `,
            }}
          /> */}

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;800&amp;display=swap"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;800&amp;display=swap"
            rel="stylesheet"
          />
        </Head>
        <div
          key="fridaMouse"
          aria-hidden="true"
          id={'mouse'}
          className={`frida_mouse`}
        >
          <div></div>
        </div>
        <script
          key="fridaMouseJS"
          dangerouslySetInnerHTML={{
            __html: `window.FridaMouse = document.querySelector("#mouse");`,
          }}
        />

        <body className="overflow-x-hidden">
          <Main />
          <NextScript />
          <div id="drawer" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
