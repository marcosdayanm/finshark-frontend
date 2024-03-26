import React, { useEffect, useState } from "react";
import { CompanyProfile } from "../../../company";
import { getCompanyProfile } from "../../../api";
import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import CompanyDashboard from "../../CompanyDashboard/CompanyDashboard";
import Tile from "../../Tile/Tile";

type Props = {};

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />

          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subtitle={company.companyName}></Tile>
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company not found</div>
      )}
    </>
  );
};

export default CompanyPage;
