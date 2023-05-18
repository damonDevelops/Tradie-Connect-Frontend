// import statements
import * as React from "react";
import CustomerDash from "../components/Dashboard/CustomerDashboard";
import ReviewTestComponent from "../components/Review/ReviewTestComponent";
export default function NewRequestScreen() {
  return (
    <CustomerDash>
      <ReviewTestComponent />
    </CustomerDash>
  );
}
