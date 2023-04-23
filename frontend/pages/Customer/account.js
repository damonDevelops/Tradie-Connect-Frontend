// import statements
import * as React from "react";
import Account from "../../components/Account/Account";
import CustomerDash from "./index";


export default function AccountScreen() {
  return (
    <CustomerDash>
      <Account />
    </CustomerDash>
  );
}
