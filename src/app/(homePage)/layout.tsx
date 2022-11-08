import { PingPongIcon } from "@icons";
import "@styles/tailwind.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className="flex w-screen flex-col items-center">
        <div className="mt-36 flex flex-col items-center pb-8">
          <PingPongIcon className="w-32" />
          <span className="mt-8 text-3xl font-semibold">
            Vincit Table Tennis
          </span>
          <span>Please register to continue</span>
        </div>
        {children}
      </body>
    </html>
  );
}
