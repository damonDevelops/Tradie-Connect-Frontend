// import statements
import * as React from "react";
import NewRequest from "../../../components/Requests/NewRequest";
import CustomerDash from "../index";



export default function NewRequestScreen() {
  return (
    <CustomerDash>
      <NewRequest />
    </CustomerDash>
  );
}
