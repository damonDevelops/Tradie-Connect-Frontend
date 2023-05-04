// import statements
import * as React from "react";
import CustomerDash from "../../components/Dashboard/CustomerDashboard";
import AdminDash from "../../components/Dashboard/AdminDashboard";
import ServiceProviders from "../../components/Admin/ServiceProviders";

export default function ServiceProvidersPage() {
  return (
    <AdminDash>
      <ServiceProviders />
    </AdminDash>
  );
}
