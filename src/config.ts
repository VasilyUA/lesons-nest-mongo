import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = `${process.env.NODE_ENV}.env`;
const filePath = path.resolve(__dirname, '..', 'config', fileName);

export default ConfigModule.forRoot({
	envFilePath: [filePath],
	isGlobal: true,
});
