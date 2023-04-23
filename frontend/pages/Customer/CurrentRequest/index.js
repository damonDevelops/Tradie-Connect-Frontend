// import statements
import * as React from "react";
import CurrentRequest from "../../../components/Requests/CurrentRequest";
import CustomerDash from "../index";

export default function CurrentRequestScreen() {
  return (
    <CustomerDash>
      <CurrentRequest />
    </CustomerDash>
  );
}
