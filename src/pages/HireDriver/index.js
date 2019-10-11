import React from "react";

import Layout from "../../components/Layout";
import { withAuthorization } from "../../components/Session";
import HireDriverForm from "./HireDriverForm";

const Orders = props => {
  return (
    <Layout type="no-center">
      <div className="w-full py-2">
        <h1 className="uk-heading-bullet text-xl md:text-2xl">Hire driver</h1>
        <div className="py-4">
          <HireDriverForm me={props.me} />
        </div>
      </div>
    </Layout>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Orders);
