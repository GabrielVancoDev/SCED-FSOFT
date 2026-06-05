import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <div>
        <Sidebar />

        <main>{children}</main>
      </div>
    </>
  );
}
