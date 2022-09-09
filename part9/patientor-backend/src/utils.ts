import {
  Gender, 
  HealthCheckRating, 
  NewHealthCheckEntry, 
  NewHospitalEntry, 
  NewPatientEntry, 
  NewOccupationalHealthcareEntry
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist.');
  }

  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (Array.isArray(diagnosisCodes)) {
    diagnosisCodes.forEach((code: string) => {
      if (!code || !isString(code)) {
        throw new Error('Incorrect or missing diagnosis codes');
      }
    });
  } else {
    throw new Error('Incorrect or missing diagnosis codes');
  };

  return diagnosisCodes;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isString(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  
  return rating;
};

type Discharge = {
  date: string,
  criteria: string
};

const isDischarge = (param: unknown): param is Discharge => {  
  return param instanceof Object && Object.keys(param).includes('date') && Object.keys(param).includes('criteria');
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }

  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name.');
  }

  return employerName;
};

type SickLeave = {
  startDate: string;
  endDate: string;
}

const isSickLeave = (param: unknown): param is SickLeave => {  
  return param instanceof Object && Object.keys(param).includes('startDate') && Object.keys(param).includes('endDate');
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }

  return sickLeave;
};

type Fields = { name: unknown, gender: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown };

export const toNewPatientEntry = ({ name, gender, ssn, dateOfBirth, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    gender: parseGender(gender),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

type BaseEntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
};
type HealthCheckFields = BaseEntryFields & { healthCheckRating: unknown };
type HospitalFields = BaseEntryFields & { discharge: unknown };
type OccupationalHealthcareFields = BaseEntryFields & { employerName: unknown, sickLeave?: unknown };

export const toNewHealthCheckEntry = ({ description, date, specialist, diagnosisCodes, healthCheckRating }: HealthCheckFields): NewHealthCheckEntry => {
  const newEntry: NewHealthCheckEntry = {
    type: 'HealthCheck',
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };

  return newEntry;
};

export const toNewHospitalEntry = ({ description, date, specialist, diagnosisCodes, discharge }: HospitalFields): NewHospitalEntry => {
  const newEntry: NewHospitalEntry = {
    type: 'Hospital',
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    discharge: parseDischarge(discharge)
  };

  return newEntry;
};

export const toNewOccupationalHealthcareEntry = ({ description, date, specialist, diagnosisCodes, employerName, sickLeave }: OccupationalHealthcareFields): NewOccupationalHealthcareEntry => {
  const newEntry: NewOccupationalHealthcareEntry = {
    type: 'OccupationalHealthcare',
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    employerName: parseEmployerName(employerName),
    sickLeave: parseSickLeave(sickLeave)
  };

  return newEntry;
};