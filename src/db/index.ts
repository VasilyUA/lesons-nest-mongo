import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { User, UserSchema, UserDocument } from './schemas/user.schema';
import { Permission, PermissionSchema, PermissionDocument } from './schemas/permission.schema';

export default MongooseModule.forFeature([
	{ name: User.name, schema: UserSchema },
	{ name: Permission.name, schema: PermissionSchema },
]);

export type mongoId = mongoose.Schema.Types.ObjectId;

export { User, UserDocument, Permission, PermissionDocument };
