import React, { useEffect, useState } from "react";
import Assessment from "../../Receptionist/Assessment/Assessment";
import { patientActions } from "../../../features/patient/patient-slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

function ViewPatient() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userType = useSelector((state) => state.auth.userType);

  const Patient_Id = useSelector((state) => state.patient.Patient_Id);
  const Patient_Name = useSelector((state) => state.patient.Patient_Name);
  const Patient_Email = useSelector((state) => state.patient.Patient_Email);

  const Patient_Age = useSelector((state) => state.patient.Patient_Age);
  const Patient_Gender = useSelector((state) => state.patient.Patient_Gender);
  const Patient_Height = useSelector((state) => state.patient.Patient_Height);
  const Patient_Weight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );
  const Employed = useSelector((state) => state.patient.Employed);
  const Occupation = useSelector((state) => state.patient.Occupation);
  const Address = useSelector((state) => state.patient.Address);
  const Assesment = useSelector((state) => state.patient.Assesment);

  const [chosenDate, setchosenDate] = useState(
    Assesment ? Assesment[0]?.Date : ""
  );

  const [loading, setloading] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [allDocsGot, setallDocsGot] = useState(false);

  const [allDocs, setallDocs] = useState([]);

  // console.log(process.env.REACT_APP_HOPE_BACKEND);
  const addAss = async () => {
    if (userType == "Receptionist") {
      console.log(Patient_Id);
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: Patient_Id,
        })
        .then((res) => {
          console.log(res);
          dispatch(
            patientActions.setPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: res.data.Patient_Name,
              Patient_Age: res.data.Patient_Age,
              Patient_Gender: res.data.Patient_Gender,
              Patient_Height: res.data.Patient_Height,
              Patient_Weight: res.data.Patient_Weight,
              Patient_Contact_No: res.data.Patient_Contact_No,
              Employed: res.data.Employed,
              Occupation: res.data.Occupation,
              Address: res.data.Address,
              Assesment: res.data.Assessment,
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/receptionist/dashboard/addBasicAssessment/" + Patient_Id);
    } else if (userType == "Senior Doctor") {
      console.log(Patient_Id);
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: Patient_Id,
        })
        .then((res) => {
          console.log(res);
          dispatch(
            patientActions.setPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: res.data.Patient_Name,
              Patient_Age: res.data.Patient_Age,
              Patient_Gender: res.data.Patient_Gender,
              Patient_Height: res.data.Patient_Height,
              Patient_Weight: res.data.Patient_Weight,
              Patient_Contact_No: res.data.Patient_Contact_No,
              Employed: res.data.Employed,
              Occupation: res.data.Occupation,
              Address: res.data.Address,
              Assesment: res.data.Assessment,
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/srDoctor/dashboard/addDocAssessment/" + Patient_Id);
    } else if (userType == "Junior Doctor") {
      console.log(Patient_Id);
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: Patient_Id,
        })
        .then((res) => {
          console.log(res);
          dispatch(
            patientActions.setPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: res.data.Patient_Name,
              Patient_Age: res.data.Patient_Age,
              Patient_Gender: res.data.Patient_Gender,
              Patient_Height: res.data.Patient_Height,
              Patient_Weight: res.data.Patient_Weight,
              Patient_Contact_No: res.data.Patient_Contact_No,
              Employed: res.data.Employed,
              Occupation: res.data.Occupation,
              Address: res.data.Address,
              Assesment: res.data.Assessment,
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/jrDoctor/dashboard/addDocAssessment/" + Patient_Id);
    } else if (userType == "Trainer") {
      console.log(Patient_Id);
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: Patient_Id,
        })
        .then((res) => {
          console.log(res);
          dispatch(
            patientActions.setPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: res.data.Patient_Name,
              Patient_Age: res.data.Patient_Age,
              Patient_Gender: res.data.Patient_Gender,
              Patient_Height: res.data.Patient_Height,
              Patient_Weight: res.data.Patient_Weight,
              Patient_Contact_No: res.data.Patient_Contact_No,
              Employed: res.data.Employed,
              Occupation: res.data.Occupation,
              Address: res.data.Address,
              Assesment: res.data.Assessment,
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/trainer/dashboard/addBasicParQ/" + Patient_Id);
    }
  };

  const editPatient = () => {
    navigate("/receptionist/dashboard/editPatient/" + Patient_Id);
  };

  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (value == "info") {
      toast.info(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Error: " + value, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const showAss = () => {
    if (Assesment?.length > 0) {
      // console.log(Assesment);
      // console.log("Date", chosenDate);
      if (chosenDate) {
        const filteredAssessment = Assesment?.filter((obj) =>
          obj.Date.toString().includes(chosenDate)
        );

        // console.log(filteredAssessment);
        if (filteredAssessment?.length > 0) {
          // return <div>Bye</div>
          return <Assessment FullAss={filteredAssessment[0]} />;
        }
      }

      return <Assessment FullAss={Assesment[0]} />;
    }
    return (
      <div className="text-red-500 font-bold mt-4">
        Receptionist should add Basic Assessment
      </div>
    );
  };

  const downloadPdf = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        process.env.REACT_APP_HOPE_BACKEND + "GetDischargeSummary",
        {
          Patient_Id: Patient_Id,
          DateOfAssessment: chosenDate,
        },
        {
          responseType: "blob", // Set the response type to 'blob' to receive binary data
        }
      );

      // Create a Blob from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a temporary <a> element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute(
        "download",
        `discharge_${Patient_Id}_${chosenDate}.pdf`
      ); // Set the desired filename for the downloaded file

      // Append the <a> element to the body and click it to trigger the download
      document.body.appendChild(tempLink);
      tempLink.click();

      // Clean up the temporary elements and URL
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
      setloading(false);
    } catch (error) {
      setloading(false);
      notify(
        "error",
        "Please check if Senior Doctor Prescription and Junior Doctor Prescription is added for the date or Please try later"
      );
    }
  };

  // upload Patient Documents
  const onFileChange = (event) => {
    event.preventDefault();
    setSelectedFiles(Array.from(event.target.files));
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const response = await axios.post(
        process.env.REACT_APP_HOPE_BACKEND + "analyse_doc/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      notify("success", file.name + " Document Analysed Successfully");

      console.log(response.data);
      //push to allDocs
      setallDocs([...allDocs, { FileName: file.name, Data: response.data }]);

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  };
  useEffect(() => {
    console.log(allDocs);
  }, [allDocs]);

  const uploadFilesSequentially = async () => {
    // setUploading(true);

    for (const file of selectedFiles) {
      const success = await uploadFile(file);
      if (!success) {
        setallDocsGot(true);

        notify("success", "All Documents Analysed Successfully");
        break;
      }
    }
    // getAllDocs();
    // setUploading(false);
  };

  const fileData = () => {
    if (selectedFiles.length > 0) {
      return (
        <ul className="flex items-center gap-2 w-full">
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}, </li>
          ))}
        </ul>
      );
    } else {
      return (
        <div>
          <br />
          <h4>No files selected</h4>
        </div>
      );
    }
  };

  const ALLDocsAnalysed = () => {
    //show allDocs with fileName and Data of each file
    if (allDocs.length > 0) {
      return (
        <ul className="flex items-center gap-2 w-full">
          {allDocs.map((doc, index) => (
            <details>
              <summary>{doc.FileName}</summary>
              <p>{doc.Data}</p>
            </details>
          ))}
        </ul>
      );
    } else {
      return (
        <div>
          <br />
          <h4>No files analysed</h4>
        </div>
      );
    }
  };

  const uploadToDB = async () => {
    try {
      // setloading(true);
      const response = await axios.post(
        process.env.REACT_APP_HOPE_BACKEND + "upload_doc/",
        {
          Patient_Id: Patient_Id,
          doc: allDocs,
        }
      );
      if (response.status == 200) {
        notify("success", "Documents Uploaded Successfully");
      }
      console.log(response);
    } catch (error) {
      // setloading(false);
      notify("error", "Please try later");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div class="p-4">
        <div class="p-8 bg-white shadow mt-16">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p class="font-bold text-gray-700 text-xl">{Patient_Gender}</p>
                <p class="text-gray-400">Gender</p>
              </div>
              <div>
                <p class="font-bold text-gray-700 text-xl">
                  {Patient_Height} cms
                </p>
                <p class="text-gray-400">Height</p>
              </div>
              <div>
                <p class="font-bold text-gray-700 text-xl">
                  {Patient_Weight} kgs
                </p>
                <p class="text-gray-400">Weighth</p>
              </div>
            </div>
            <div class="relative">
              <div class="w-48 h-48 bg-violet-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-violet-500 text-3xl">
                {Patient_Id}
              </div>
            </div>

            <div class="space-x-4 flex w-full justify-between mt-32 md:mt-0 ">
              {userType != "Trainer" && (
                <button
                  class="text-white py-2 px-4 text-sm uppercase rounded bg-purple-400 hover:bg-purple-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={addAss}
                >
                  Add Assesment
                </button>
              )}
              {userType == "Trainer" && (
                <button
                  class="text-white py-2 px-4 text-sm uppercase rounded bg-purple-400 hover:bg-purple-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={addAss}
                >
                  Add Basic + PARQ
                </button>
              )}
              {userType == "Receptionist" && (
                <button
                  class="text-white py-2 px-4 text-sm uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={editPatient}
                >
                  Edit Basic Details
                </button>
              )}

              {Assesment?.length > 0 && (
                <select
                  id="chooseDate"
                  name="chooseDate"
                  value={chosenDate}
                  onChange={(e) => {
                    setchosenDate(e.target.value);
                  }}
                  className="w-full text-black
                  
                  +rounded-md shadow-sm sm:text-sm outline-none p-2 border border-gray-300"
                >
                  {Assesment?.map((a) => {
                    return <option value={a.Date}>{a.Date}</option>;
                  })}
                </select>
              )}
            </div>
          </div>

          <div class="mt-12 text-center border-b pb-12 flex flex-col items-center justify-center">
            <button
              onClick={downloadPdf}
              className="flex w-56 mb-8 items-center justify-center gap-4 font-bold text-xl rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500"
            >
              <span>Download</span>
              <FiDownload />
              {loading && (
                <img
                  src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                  width="30px"
                />
              )}
            </button>
            <h1 class="text-4xl font-medium text-gray-700">
              {Patient_Name},{" "}
              <span class="font-light text-gray-500">{Patient_Age}</span>
            </h1>
            <p class="font-light text-gray-600 my-3">{Address}</p>
            <p class=" text-gray-700 font-medium">{Patient_Email}</p>

            <span class="mt-4 text-gray-500">
              {/* <AiOutlinePhone /> */}
              {Patient_Contact_No}
            </span>
            <p class="mt-2 text-gray-400">{Occupation}</p>
          </div>

          <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mx-4">
            <div
              id="FileUpload"
              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
            >
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={onFileChange}
                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              />
              <div className="text-black mb-4">{fileData()}</div>
              {/* <div>{console.log(fileData)}</div> */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#3C50E0"
                    />
                  </svg>
                </span>
                <p>
                  <span className="text-primary">Click to upload</span> Patient
                  Documents
                </p>
                <p className="mt-1.5">PDFs only</p>
                {/* <p>(max, 800 X 800px)</p> */}
              </div>
            </div>

            <div className="flex justify-end gap-4.5 mt-4">
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray-50 hover:bg-opacity-70"
                onClick={uploadFilesSequentially}
              >
                Analyse Documents
              </button>
            </div>
            <div className="flex justify-end gap-4.5 mt-4">
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray-50 hover:bg-opacity-70"
                onClick={uploadToDB}
              >
                Upload to DB
              </button>
            </div>
            <div className="text-gray-600">Docs Analysed</div>
            <div>{ALLDocsAnalysed()}</div>
          </div>
          <div class="flex w-full flex-col justify-center items-center">
            {showAss()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPatient;
