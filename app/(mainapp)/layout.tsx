import Sidebar from "@/component/sidebar/side";
import Right from "@/component/rightside/rigside";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-[230px] flex-1 overflow-auto">
        {children}
      </main>

      {/* Right Sidebar */}
      <Right />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}