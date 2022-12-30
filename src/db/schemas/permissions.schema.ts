import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PermissionDocument = mongoose.HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
	@ApiProperty({ type: mongoose.Schema.Types.ObjectId, example: '1eA2sF3...', description: 'Унікальний монго ідентифікатор' })
	@Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
	_id: string;

	@ApiProperty({ type: String, example: 'test', description: 'Назва ролі' })
	@Prop({ type: String, required: true, unique: true })
	roleName: string;

	@ApiProperty({ type: [String], example: 'test', description: 'Назва доступу' })
	@Prop({ type: [String], required: true })
	permissions: [string];
}

const PermissionSchema = SchemaFactory.createForClass(Permission);
PermissionSchema.set('toJSON', { virtuals: true });
PermissionSchema.set('toObject', { virtuals: true });

export { PermissionSchema };
