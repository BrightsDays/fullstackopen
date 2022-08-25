import patientData from "../../data/patients.json";
import { Patient, PatientInfo } from "../../types";

const patients: Patient[] = patientData as Patient[];

const getEntries = (): PatientInfo[] => {
  return patients.map(({ id, name, gender, occupation }) => ({
    id,
    name,
    gender,
    occupation
  }));
};

export default {
  getEntries
};