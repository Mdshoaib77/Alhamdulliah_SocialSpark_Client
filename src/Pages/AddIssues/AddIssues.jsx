import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";
const AddIssues = () => {
  const { user } = useContext(AuthContext);
  const today = new Date().toISOString().split("T")[0];

  const categories = [
    "Garbage Management",
    "Roads & Transport",
    "Water & Drainage",
    "Electricity",
    "Environment",
    "Traffic & Signals",
    "Public Safety",
    "Education & Health",
    "Business & Commerce",
    "Parks & Recreation",
    "Infrastructure Development",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");

  const handelAddIssues = (e) => {
    e.preventDefault();
    const addIssuesData = {
      title: e.target.title.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      amount: e.target.amount.value,
      email: e.target.email.value,
      status: e.target.status.value,
      date: e.target.date.value,
      createdTime: new Date(),
    };
    fetch("https://b12-assignment-10-server.vercel.app/issues", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addIssuesData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Added Successfully!",
          text: "Your issues has been Added.",
          icon: "success",
          confirmButtonColor: "#22C55E",
        }).then(() => {
          window.location.href = "/all-issues";
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-800 ">
      <title>Create Events</title>
      <form
        className="flex flex-col items-center text-sm pt-8 pb-8 "
        onSubmit={handelAddIssues}>
        <h1 className="text-4xl font-bold text-purple-800 pb-4">
          Create New Community Issue
        </h1>
        <p className="text-sm text-gray-500 text-center pb-10">
          Fill out the details below to help us identify and resolve the
          problem.
        </p>
        <div className="mt-6 w-[350px] md:w-[700px] mb-5">
          <label className="text-black/70 dark:text-gray-200 font-semibold">Issues Title</label>
          <input
            placeholder="Enter Your Issues Title"
            name="title"
            className="placeholder-gray-500 dark:text-gray-200  text-gray-700 h-12 p-2 mt-2 w-full border border-green-500/30 rounded outline-none focus:border-green-500"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
          <div className="w-full">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Select Category
              </label>

              <select
                id="category"
                name="category"
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border text-gray-500 border-green-500/30 rounded px-3 py-3 text-sm focus:outline-none dark:text-gray-200  focus:border-green-500 ">
                <option value="" className="dark:bg-gray-700">-- Choose a category --</option>
                {categories.map((category, index) => (
                  <option key={index} value={category} className="bg-white dark:bg-gray-700">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <label className="text-black/70 font-semibold dark:text-gray-200">Location</label>
            <input
              placeholder="Enter the Location"
              className="placeholder-gray-500 dark:text-gray-200  text-gray-700 h-12 p-2 mt-2 w-full border border-green-500/30 rounded outline-none focus:border-green-500"
              type="text"
              name="location"
              required
            />
          </div>
        </div>

        <div className="mt-6 w-[350px] md:w-[700px]">
          <label className="text-black/70 font-semibold dark:text-gray-200" >Description</label>
          <textarea
            placeholder="Write Your Issues in Details..."
            name="description"
            className="w-full dark:text-gray-200  placeholder-gray-500 text-gray-700 mt-2 p-2 h-40 border border-green-500/30 rounded resize-none outline-none focus:border-green-500"
            required></textarea>
        </div>
        <div className="mt-6 w-[350px] md:w-[700px] mb-5">
          <label className="text-black/70 font-semibold dark:text-gray-200">
            Issues Image Link
          </label>

          <input
            placeholder="Enter Your Issues Image Link"
            className=" placeholder-gray-500 dark:text-gray-200   text-gray-700 h-12 p-2 mt-2 border border-green-500/30 rounded outline-none focus:border-green-500 w-full"
            type="text"
            name="image"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px] mb-5">
          <div className="w-full">
            <label className="text-black/70 font-semibold dark:text-gray-200">
              Suggested Fix Budget
            </label>
            <div className=" px-2 mt-2 w-full border border-green-500/30 rounded flex items-center focus:border-green-500 gap-1">
              <FaDollarSign color="gray" />
              <input
                placeholder="00000"
                className="outline-none  text-gray-700 dark:text-gray-200 placeholder-gray-500 w-full h-11"
                type="number"
                name="amount"
                required
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-black/70 font-semibold dark:text-gray-200">Your Email</label>
            <input
              value={user?.email || user?.reloadUserInfo?.email}
              className="text-gray-500 h-12 p-2 mt-2 w-full border border-green-500/30 rounded outline-none focus:border-green-500"
              type="email"
              readOnly
              name="email"
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
          <div className="w-full">
            <label className="text-black/70 font-semibold dark:text-gray-200">Status</label>
            <input
              value="Ongoing"
              readOnly
              className="text-gray-500 h-12 p-2 mt-2 w-full border border-green-500/30 rounded outline-none focus:border-green-500"
              type="text"
              name="status"
              required
            />
          </div>
          <div className="w-full">
            <label className="text-black/70 font-semibold dark:text-gray-200">Date</label>
            <input
              value={today}
              readOnly
              name="date"
              className="text-gray-500  h-12 p-2 mt-2 w-full border border-green-500/30 rounded outline-none focus:border-green-500"
              type="text"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-purple-800 text-white h-12 w-56 px-4 rounded active:scale-95 transition font-bold">
          Submit Issues
        </button>
      </form>
    </div>
  );
};

export default AddIssues;
