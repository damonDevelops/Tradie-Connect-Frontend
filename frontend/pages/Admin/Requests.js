// import statements
import * as React from "react";
import CustomerDash from "../../components/Dashboard/CustomerDashboard";
import AdminDash from "../../components/Dashboard/AdminDashboard";
import Requests from "../../components/Admin/Requests";

export default function RequestsPage() {
  return (
    <AdminDash>
      <Requests />
    </AdminDash>
  );
}
