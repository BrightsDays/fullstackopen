import patientData from "../../data/patients";
import { v1 as uuid } from 'uuid';
import { EntriesEntry, NewPatientEntry, Patient, PatientInfo } from "../types";

const patients: Patient[] = patientData as Patient[];

const getEntries = (): PatientInfo[] => {
  return patients.map(({ id, name, gender, occupation }) => ({
    id,
    name,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(item => item.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };
  
  patients.push(newPatientEntry);
  
  return newPatientEntry;
};

const addEntry = (entry: EntriesEntry, patientId: string): EntriesEntry => {
  const id = uuid();
  const patient = patients.find(item => item.id === patientId);

  const newEntry = {
    id,
    ...entry
  };
  
  patient?.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  addEntry
};