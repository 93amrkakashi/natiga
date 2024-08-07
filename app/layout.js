import "./globals.css";
import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata = {
  title: "نتيجة الثانوية العامة بدرجات المواد 2024",
  description: "نتيجة الثانوية العامة بدرجات المواد 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://alwingulla.com/88/tag.min.js"
          data-zone="86112"
          async
          data-cfasync="false"
        ></script>
      </head>
      <body dir="rtl" className={cairo.className}>
        {children}
      </body>
    </html>
  );
}
