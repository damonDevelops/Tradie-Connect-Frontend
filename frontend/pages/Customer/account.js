// import statements
import * as React from "react";
import Account from "../../components/Account";
import CustomerDash from "./index";
import { Paper } from "@mui/material";

export default function AccountScreen() {
  return (
    <CustomerDash>
      <Account />
    </CustomerDash>
  );
}
