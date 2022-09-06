import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";
import { fetchPatient, setDiagnosisList, useStateValue } from "../state";
import { useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

const PatientPage = () => {
  const [ { patient, diagnoses }, dispatch] = useStateValue();
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

    const fetchDiagnosisList = async () => {
        try {
          const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses/`
            );
          
          dispatch(setDiagnosisList(diagnosesFromApi));
        } catch (error) {
          console.log(error);      
        }
    };

    void fetchPatientInfo();
    void fetchDiagnosisList();
  }, [dispatch]);

  const colorCodes = {
    0: 'green',
    1: 'yellow',
    2: 'orange',
    3: 'red'
  };

  const entries = patient 
    ? patient.entries.map(item => {
      return(
        <div 
          key={`entr_${item.id}`}
          style={
            { border: '1px solid black', 
              borderRadius: '5px', 
              margin: '10px 0', 
              padding: '5px' }}
          >
          <p>{item.date}</p>
          <p><i>{item.description}</i></p>
          { item.type === 'HealthCheck' && 
            <FavoriteIcon htmlColor={colorCodes[item.healthCheckRating]} />
          }
          <ul>
            {item.diagnosisCodes && Object.keys(diagnoses).length && item.diagnosisCodes.map(item => {
              return (
                <li key={`dgn_${item}`}>{item} {diagnoses[item].name}</li>
              );
            })}
          </ul>
          <p>Diagnose by: {item.specialist}</p>
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