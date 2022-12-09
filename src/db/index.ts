import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema, UserDocument } from './schemas/user.schema';

export { User, UserDocument };

const schemas = [{ name: User.name, schema: UserSchema }];
export default MongooseModule.forFeature(schemas);
