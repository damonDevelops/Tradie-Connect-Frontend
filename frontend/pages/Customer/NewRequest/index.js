// import statements
import * as React from "react";

import NewRequest from "../../../components/NewRequest/NewRequest";
import CustomerDash from "./index";
import Account from "../../../components/Account/Account";


export default function NewRequestScreen() {
  return (
    <CustomerDash>
      <Account />
    </CustomerDash>
  );
}
