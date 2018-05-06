import { getAPIKey } from './src/utils/localStorage';

export const API_KEY = getAPIKey() || "YOU-MUST-PROVIDE-AN-API-KEY-HERE";