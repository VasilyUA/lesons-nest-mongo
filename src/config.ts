import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

const fileName = `${process.env.NODE_ENV}.env`;
const filePath = path.resolve(__dirname, '..', 'config', fileName);

export default ConfigModule.forRoot({
	envFilePath: [filePath],
	isGlobal: true,
});
