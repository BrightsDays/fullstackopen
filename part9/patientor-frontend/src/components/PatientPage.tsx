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

  const entries = patient 
    ? patient.entries.map(item => {
      return(
        <div key={`entr_${item.id}`}>
          <p>{item.date}</p>
          <p>{item.description}</p>
          <ul>
            {item.diagnosisCodes && item.diagnosisCodes.map(item => <li key={`dgn_${item}`}>{item}</li>)}
          </ul>
        </div>
      );
    })
    : [];

  return (
    <div>
      { !patient && <p>Something went wrong...</p>}
      { patient &&
        <div>
          <h2>{patient.name}</h2>
          <p>gender: {patient.gender}</p>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          
          <h3>Entries</h3>
          { entries }
        </div>
      }
    </div>
  );
};

export default PatientPage;