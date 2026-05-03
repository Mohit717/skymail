import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Topbar />
    <div className="container-fluid page-body-wrapper">
      {/* <Navbar /> */}
      <div className="main-panel">
        <div className="content-wrapper">
          {children}
        </div>
      </div>

    </div>
    </>
  );
}
