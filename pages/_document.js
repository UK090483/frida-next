import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
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
