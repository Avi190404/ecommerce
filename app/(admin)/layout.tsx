import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col md:flex-row text-black`}>
        <Sidebar />
        <main className="flex-1 pt-20 md:pt-0 md:ml-64 min-h-screen">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </body>
    </html>
  );
}