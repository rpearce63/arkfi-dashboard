import * as React from "react";

import AccountsTable from "../components/AccountsTable";
import AddWallet from "../components/AddWallet";

export default () => {
  return (
    <div>
      <AddWallet/>
      <AccountsTable />
    </div>
  );
};
