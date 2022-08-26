import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = req.body;

  const addedPatient = patientService.addPatient(newPatientEntry);

  res.json(addedPatient);
});

export default router;