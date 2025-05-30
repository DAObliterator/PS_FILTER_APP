import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import studentBranchFun from "./utils/test";
import { FormValidErr } from "./components/FormValidErr";
import {FaGithub, FaInstagram} from "react-icons/fa";

import axios from "axios";

function App() {
  const [branch, setBranch] = useState("");
  const [businessDomain, setBusinessDomain] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [filteredStationsArr, setFilteredStationsArr] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  /*const handleSubmit = (ev) => {

    console.log(`handleSubmit function called !!! `)

    ev.preventDefault();






  };*/

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post(`${import.meta.env.VITE_API}/stations/getAllStations`, { data })
      .then((response) => {
        if (response.status === 200) {
          if ( import.meta.env.VITE_ENV === "development") {
            console.log(
              "Response from Endpoint \n",
              JSON.stringify(response.data.eligibleStations)
            );
          }
          setFilteredStationsArr(response.data.eligibleStations);
        }
      })
      .catch((err) => {
        console.log(
          err.message,
          " err happened when fetching stations !!! ",
          err.status
        );
      });
  };

  return (
    <div
      id="App"
      className=" min-h-screen text-black bg-slate-800 flex flex-col justify-evenly items-center p-2  min-w-screen "
    >
      <h1 className="text-white text-5xl font-bold tracking-wide p-4 ">
        Welcome to the PS Filter App
      </h1>
      <form
        action=""
        id="Filter-Panel"
        className="flex flex-col justify-evenly items-center p-4 m-2 bg-slate-950 rounded-md text-black sm:w-3/4 md:w-1/2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Branch - A3/A4/A7 ..."
          className="rounded-full p-2 w-full"
          {...register("branch", {
            required: "Required",
            validate: (value) => studentBranchFun(value) !== undefined,
          })}
          aria-invalid={errors.branch ? "true" : "false"}
        />
        {errors.branch?.type === "required" && (
          <FormValidErr errmessage={"branch required"}></FormValidErr>
        )}
        {errors.branch?.type === "validate" && (
          <FormValidErr errmessage={"Invalid Branch!!! "}></FormValidErr>
        )}

        <label htmlFor="Business-Domain" className="text-white font-semibold">
          Choose a Business Domain:
        </label>
        <select
          id="Business-Domain"
          name="business-domain"
          className=" font-semibold text-black tracking-wide w-ful"
          {...register("business_domain")}
        >
          <option value="CSIS/IT">CSIS/IT</option>
          <option value="Finance and Mgmt">Finance and Mgmt</option>
          <option value="Chemical">Chemical</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Health Care">Health Care</option>
          <option value="Electronics">Electronics</option>
        </select>

        <label htmlFor="Project-Domain" className="text-white font-semibold">
          Choose a Project Domain:
        </label>
        <select
          id="Project-Domain"
          name="project-domain"
          className=" font-semibold text-black tracking-wide w-full"
          {...register("project_domain")}
        >
          <option value="Electronics">Electronics</option>
          <option value="AI">AI</option>
          <option value="Mechanical">Mechanical</option>
          <option value="CAD">CAD</option>
          <option value="IT">IT</option>
          <option value="Computer Science">Computer Science</option>
          <option value="AI & ML">AI & ML</option>
          <option value="Yet to be finalized">Yet to be finalized</option>
          <option value="Data Dashboards">Data Dashboards</option>
          <option value="Project Reporting">Project Reporting</option>
          <option value="Finance">Finance</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Finance & IT">Finance & IT</option>
          <option value="Numerical methods and programming">
            Numerical methods and programming
          </option>
          <option value="Civil">Civil</option>
          <option value="Application Development">
            Application Development
          </option>
          <option value="Software Development">Software Development</option>
          <option value="Amazon SDE">Amazon SDE</option>
          <option value="AI,Analytics">AI,Analytics</option>
          <option value="Design Verification">Design Verification</option>
        </select>

        <button
          type="Submit"
          className="m-2 p-2 text-white bg-red-500 rounded-md shadow-md font-2xl  "
        >
          Submit
        </button>
      </form>
      {filteredStationsArr.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table
            id="Stations-Table"
            className="min-w-full rounded-md shadow-md bg-black text-white text-xs sm:text-sm"
          >
            <thead>
              <tr className="text-sm bg-gray-800">
                <th className="p-2 whitespace-nowrap">Station Id</th>
                <th className="p-2 whitespace-nowrap">Station Name</th>
                <th className="p-2 whitespace-nowrap">City</th>
                <th className="p-2 whitespace-nowrap">Total Project</th>
                <th className="p-2 whitespace-nowrap">Business Domain</th>
                <th className="p-2 whitespace-nowrap">Branches Eligible</th>
                <th className="p-2 whitespace-nowrap">Project Domain</th>
                <th className="p-2 whitespace-nowrap">Title</th>
              </tr>
            </thead>
            <tbody>
              {filteredStationsArr.map((e, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 ? "bg-gray-700" : "bg-black"
                    } text-xs sm:text-sm`}
                  >
                    <td className="p-2 whitespace-nowrap">{e["Station Id"]}</td>
                    <td className="p-2 whitespace-nowrap">
                      {e["Station Name"]}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {e["Centre (City)"]}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {e["Total Project"]}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {e["Business Domain"]}
                    </td>
                    <td className="p-2 whitespace-nowrap">{e["Tags"]}</td>
                    <td className="p-2 whitespace-nowrap">
                      {e["Project Domain"]}
                    </td>
                    <td className="p-2 whitespace-nowrap">{e["Title"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No Stations Found</h1>
      )}
      <div
        id="Socials"
        className="flex flex-row justify-center gap-10 w-full items-center py-4"
      >
        <a
          href="https://www.instagram.com/saradh_75?igsh=bzd1MXVhZjlqajQ2"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-pink-600 transition-colors"
        >
          <FaInstagram />
        </a>
        <a
          href="https://github.com/DAObliterator"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-400 transition-colors"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default App;
