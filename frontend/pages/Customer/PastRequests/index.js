// import statements
import * as React from "react";
import PastRequest from "../../../components/Requests/PastRequests";
import CustomerDash from "../index";


export default function PastRequestScreen() {
  return (
    <CustomerDash>
      <PastRequest />
    </CustomerDash>
  );
}