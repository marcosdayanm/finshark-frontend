import React from "react";
import Table from "../../Table/Table";
import RatioList from "../../RatioList/RatioList";
import { testIncomeStatementData } from "../../Table/testData";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) =>
      formatLargeNonMonetaryNumber(company.marketCapTTM),
    subTitle: "Total value of all a company's shares of stock",
  },
];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Design Page</h1>
      <h2>
        This is Finshark's Design Page, we will house various designs and
        aspects from the app
      </h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table />
    </>
  );
};

export default DesignPage;
function formatLargeNonMonetaryNumber(marketCapTTM: any) {
  throw new Error("Function not implemented.");
}
