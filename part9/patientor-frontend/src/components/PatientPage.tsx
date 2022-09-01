import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { fetchPatient, useStateValue } from "../state";
import { useEffect } from "react";

const PatientPage = () => {
  const [ { patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (id && patient?.id !== id) {
        try {
          const { data: patientInfoFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
            );
          
          dispatch(fetchPatient(patientInfoFromApi));
        } catch (error) {
          console.log(error);      
        }
      }
    };
    void fetchPatientInfo();
  }, [dispatch]);

  return (
    <div>
      { !patient && <p>Something went wrong...</p>}
      { patient &&
        <div>
          <h2>{patient.name}</h2>
          <p>gender: {patient.gender}</p>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
      }
    </div>
  );
};

export default PatientPage;