/**
 * Admin layout with sidebar navigation
 */

import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/common";

export const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        {/* Admin Sidebar - can be added later */}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
