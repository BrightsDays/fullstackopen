import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnoseData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};