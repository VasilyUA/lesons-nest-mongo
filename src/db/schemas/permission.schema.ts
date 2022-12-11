import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PermissionDocument = mongoose.HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
	@ApiProperty({ example: '1eA2sF3...', description: 'Унікальний монго ідентифікатор' })
	@Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
	_id: string;

	@ApiProperty({ example: 'test', description: 'Назва ролі' })
	@Prop({ type: String, required: true, unique: true })
	PermissionName: string;

	@ApiProperty({ example: 'test', description: 'Назва ролі' })
	@Prop({ type: [String], required: true })
	permissions: [string];
}

const PermissionSchema = SchemaFactory.createForClass(Permission);
PermissionSchema.set('toJSON', { virtuals: true });
PermissionSchema.set('toObject', { virtuals: true });

export { PermissionSchema };
