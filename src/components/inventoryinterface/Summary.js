import React from "react";
import Layout from "../../layouts/layout";
import BarchartInventory from "./additional/BarchartInventory";
import BarchartDrugsoutcome from "./additional/BarchartDrugsoutcome";

function Summary() {
  return (
    <Layout>
      <div className="sumcontbig">
        <div className="summarycatcont">
          <div className="catbarchartt">
            <BarchartInventory />
          </div>
        </div>

        <div className="summarycatcont" style={{marginTop:'50px'}}>
          <div className="catbarchartt">
            <BarchartDrugsoutcome />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Summary;
