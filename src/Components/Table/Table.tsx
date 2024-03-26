import React from "react";
import { testIncomeStatementData } from "./testData";
const data = testIncomeStatementData;

type Props = {};

type Company = (typeof data)[0];

// El config object para la table, para definir su estructura
const configs = [
  {
    label: "Year",
    render: (company: Company) => company.acceptedDate,
  },
  {
    label: "Cost of Revenue",
    render: (company: Company) => company.costOfRevenue,
  },
];

const Table = (props: Props) => {
  // Hacer el render de las filas
  const renderRows = data.map((company) => {
    return (
      <tr key={company.cik}>
        {configs.map((val: any) => {
          return (
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
              {val.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  // Hacer el render de los encabezados
  const renderedHeaders = configs.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-fray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide=gray-200 m-5">
          {renderedHeaders}
        </thead>
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
