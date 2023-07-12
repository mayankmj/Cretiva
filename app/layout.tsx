import Footer from '@/components/Footer';
import './global.css'
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Cretiva",
  description:
    "Cretiva is an online platform for developer to showcase and share their innovative work with a global community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
      {/*this children represents the page.tsx file */}
    </html>
  );
}
