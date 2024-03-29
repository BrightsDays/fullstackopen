import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Patient } from "../types";
import { addEntry, fetchPatient, setDiagnosisList, useStateValue } from "../state";
import { useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";
import AddEntryModal from "../AddEntryModal.tsx";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "../AddEntryModal.tsx/AddEntryForm";

const PatientPage = () => {
  const [ { patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (id) {
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
  }, [dispatch, modalOpen]);

  const colorCodes = {
    1: 'green',
    2: 'yellow',
    3: 'orange',
    4: 'red'
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) {
      setError("Something went wrong with this patient ID!");
      return;
    }
    
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
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
          <p>{item.date} - {item.type}</p>
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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
          { entries }
        </div>
      }
    </div>
  );
};

export default PatientPage;