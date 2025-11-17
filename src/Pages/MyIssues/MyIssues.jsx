import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import EditIssues from "../../Components/EditIssues";
import Swal from "sweetalert2";
import axios from "axios";

const TABLE_HEAD = [
  "Issues Title",
  "Amount",
  "Date",
  "Status",
  "Category",
  "Actions",
];

const MyIssues = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [myIssues, SetMyIssues] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fatchData = async () => {
      axios(`https://b12-assignment-10-server.vercel.app/my-issues?email=${user.email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => SetMyIssues(data.data))
        .catch((error) => console.log(error.message))
        .finally(() => setLoading(false));
    };
    fatchData();
    setLoading(false);
  }, [user, setLoading]);

  const handleEdit = (issue) => {
    setSelectedIssue(issue);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedIssue(null);
  };

  const handleDelet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22C55E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b12-assignment-10-server.vercel.app/issues/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              confirmButtonColor: "#22C55E",
            })
              .then(() => {
                window.location.reload();
              })
              .catch((err) => console.log(err));
          });
      }
    });
  };

  return (
    <div className="">
      <div className="pt-8 w-11/12 mx-auto pb-8">
        <title>My Issues</title>
        <h1 className="text-4xl text-center font-bold text-purple-800 pb-6">
          My Submitted Issues{" "}
          <span className="text-lg text-gray-500 text-center pb-10">
            ({myIssues.length})
          </span>
        </h1>
        <p className="text-sm text-gray-500 text-center pb-10">
          View and manage all the issues you’ve submitted to the community.
        </p>

        <div className="overflow-x-auto rounded-lg shadow-md">
          {myIssues.length === 0 ? (
            <h1 className="text-center text-gray-500 py-20 font-bold text-2xl">
              No Submitted Issue Found
            </h1>
          ) : (
            <table className="w-full min-w-max table-auto text-left border border-gray-200 dark:border-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-900 ">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="px-4 py-3 text-sm font-semibold text-gray-500 border-b border-gray-200 dark:border-gray-900">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {myIssues.map((issue, index) => {
                  const { image, title, amount, date, status, category, _id } =
                    issue;
                  const isLast = index === myIssues.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-200 dark:border-gray-900 ";

                  return (
                    <tr key={issue._id} className="hover:bg-gray-200/80 dark:hover:bg-gray-900/40 transition">
                      <td className={classes}>
                        <Link
                          to={`/issues/${issue._id}`}
                          className="flex items-center gap-3">
                          <img
                            src={image}
                            alt={title}
                            className="w-14 h-10 rounded-md object-cover"
                          />
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {title}
                          </span>
                        </Link>
                      </td>

                      <td className={`${classes} text-gray-700 dark:text-gray-300`} >${amount}</td>
                      <td className={`${classes} text-gray-700 dark:text-gray-300`}>{date}</td>
                      <td className={`${classes} text-gray-700 dark:text-gray-300`}>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            status === "Ended"
                              ? "bg-green-100 text-green-700"
                              : status === "Ongoing"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                          {status}
                        </span>
                      </td>
                      <td className={`${classes} text-gray-700 dark:text-gray-300`}>{category}</td>

                      <td className={classes}>
                        <button
                          onClick={() => handleEdit(issue)}
                          className="p-2 rounded-md hover:bg-green-100 text-green-600 transition mr-2"
                          title="Edit">
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelet(_id)}
                          className="p-2 rounded-md hover:bg-red-100 text-red-600 transition"
                          title="Delete">
                          <MdDeleteForever size="18" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <EditIssues
          open={openModal}
          onClose={handleClose}
          data={selectedIssue}
        />
      </div>
    </div>
  );
};

export default MyIssues;
