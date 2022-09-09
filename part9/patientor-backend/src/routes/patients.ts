import express from "express";
import patientService from "../services/patientService";
import { EntriesEntry } from "../types";
import { toNewPatientEntry, toNewOccupationalHealthcareEntry, toNewHospitalEntry, toNewHealthCheckEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.path.slice(1));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  let newEntry: EntriesEntry | null  = null;

  try {
    switch (req.body.type) {
      case 'Hospital':
        newEntry = toNewHospitalEntry(req.body);
        break;
      case 'HealthCheck':
        newEntry = toNewHealthCheckEntry(req.body);
        break;
      case 'OccupationalHealthcare':
        newEntry = toNewOccupationalHealthcareEntry(req.body);
        break;
      default:
        break;
    };

    if (newEntry) {
      const addedEntry = patientService.addEntry(newEntry, req.path.slice(1, 37));
      res.json(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;