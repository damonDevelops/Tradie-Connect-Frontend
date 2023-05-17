// import statements
import * as React from "react";
import CurrentRequest from "../../../components/Requests/CustomerCurrentRequest";
import CustomerDash from "../../../components/Dashboard/CustomerDashboard";

export default function CurrentRequestScreen() {
  return (
    <CustomerDash>
      <CurrentRequest />
    </CustomerDash>
  );
}
