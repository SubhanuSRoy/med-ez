import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../features/auth/auth-slice";

function AllRevisits() {
  const [allPatients, setallPatients] = useState([]);
  const [isFetching, setisFetching] = useState(true);

  //to change tab no when component comes to focus
  const dispatch = useDispatch();
  const tabNo = useSelector((state) => state.auth.rTabNo);
  dispatch(authActions.setRTabNo(4));

  useEffect(() => {
    setisFetching(true);

    axios
      .get(process.env.REACT_APP_HOPE_BACKEND + "ReVisitPatients")
      .then((res) => {
        console.log(res.data);
        setisFetching(false);
        setallPatients(res.data.AllRevisit);
      })
      .catch((error) => {
        setisFetching(false);
        console.log(error.message);
      });
  }, []);
  return (
    <div className="p-4">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-center">
            <th className="border border-black bg-pink-500">Patient ID</th>
            <th className="border border-black bg-purple-500">Patient Name</th>
            <th className="border border-black bg-teal-500">Review Date</th>
          </tr>
        </thead>
        <tbody>
          {allPatients.map((patient) => (
            <tr key={patient._id} className="text-center">
              <td className="border border-black">{patient.Patient_Id}</td>
              <td className="border border-black">{patient.Patient_Name}</td>
              <td className="border border-black">{patient.ReviewDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllRevisits;
