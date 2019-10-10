import React from "react";

import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";
import OrdersTable from "./Orders";

const Orders = props => {
  return (
    <Layout type="no-center">
      <div className="w-full py-2">
        <h1 className="uk-heading-bullet text-xl md:text-2xl">My Orders</h1>
        <div className="py-4">
          <OrdersTable />
        </div>
      </div>
    </Layout>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Orders);
