import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema, UserDocument } from './schemas/user.schema';
import { Permission, PermissionSchema, PermissionDocument } from './schemas/permission.schema';

export default MongooseModule.forFeature([
	{ name: User.name, schema: UserSchema },
	{ name: Permission.name, schema: PermissionSchema },
]);

export { User, UserDocument, Permission, PermissionDocument };
