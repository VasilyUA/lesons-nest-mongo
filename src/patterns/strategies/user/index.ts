import { getStrategy } from '../index';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UserFactory = (req, models) => getStrategy(req, models, __dirname);
