import React, { useContext } from "react";
import { FaFileDownload } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TABLE_HEAD = ["Issues Title", "Category", "Paid Amount", "Date"];

const MyContribution = () => {
  const { contributionData } = useContext(AuthContext);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Thank you for contributing to a cleaner community!", 15, 10);

    const tableColumn = ["ID", "Title", "Category", "Amount", "Date"];
    const tableRows = contributionData.map((item) => [
      item._id,
      item.title,
      item.category,
      `$${item.amount}`,
      item.date,
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows });

    doc.save("my_contributions.pdf");
  };


  return (
    <div className="mt-8 w-11/12 mx-auto mb-8">
      <title>My Contributions</title>
      <h1 className="text-4xl text-center font-bold text-purple-800 pb-6">
        My Contributions{" "}
        <span className="text-lg text-gray-500 text-center pb-10">
          ({contributionData.length})
        </span>
      </h1>
      <p className="text-sm text-gray-500 text-center pb-10">
        A record of all your payments towards community cleanups.
      </p>

      <div className="flex justify-center -mt-4  md:justify-end mb-4 md:-mt-15">
        <button
          onClick={exportToPDF}
          className="flex gap-2 items-center p-2 rounded-md hover:bg-green-400 bg-purple-800 text-white transition"
          title="Download Receipt">
          <FaFileDownload />
          <span>Download Report</span>
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        {contributionData.length === 0 ? (
          <h1 className=" text-center text-gray-500 py-30 font-bold text-3xl ">
            No Contributions Found
          </h1>
        ) : (
          <table className="w-full min-w-max table-auto text-left border border-gray-300 dark:border-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-sm font-semibold text-gray-600 border-b border-gray-300 dark:border-gray-900 ">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {contributionData.map(
                ({ image, title, amount, date, category }, index) => {
                  const isLast = index === contributionData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-300 dark:border-gray-900";

                  return (
                    <tr
                      key={index}
                      className=" transition items-center hover:bg-gray-200/80 dark:hover:bg-gray-900/40">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <img
                            src={image}
                            alt={title}
                            className="w-14 h-10 rounded-md object-cover"
                          />
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {title}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`${classes} text-gray-700 dark:text-gray-300`}>
                        <div className="flex items-center gap-3">
                          <div className="w-fit  p-1 ">{category}</div>
                        </div>
                      </td>

                      <td className={`${classes} pl-10`}>
                        <span className="text-gray-700 dark:text-gray-300 ">${amount}</span>
                      </td>

                      <td
                        className={`${classes} text-gray-700 dark:text-gray-300`}>
                        <span className="text-gray-700 dark:text-gray-300">{date}</span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyContribution;
