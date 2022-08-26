import patientData from "../../data/patients.json";
import { v1 as uuid } from 'uuid';
import { NewPatientEntry, Patient, PatientInfo } from "../../types";

const patients: Patient[] = patientData as Patient[];

const getEntries = (): PatientInfo[] => {
  return patients.map(({ id, name, gender, occupation }) => ({
    id,
    name,
    gender,
    occupation
  }));
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

export default {
  getEntries,
  addPatient
};