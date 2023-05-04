// import statements
import * as React from "react";
import CustomerDash from "../../components/Dashboard/CustomerDashboard";
import AdminDash from "../../components/Dashboard/AdminDashboard";
import Reports from "../../components/Admin/Reports";

export default function RequestsPage() {
  return (
    <AdminDash>
      <Reports />
    </AdminDash>
  );
}
