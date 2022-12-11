import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { hashPassword } from '../../helpers/bcrypt-password';

export type RoleDocument = mongoose.HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
	@ApiProperty({ example: '1eA2sF3...', description: 'Унікальний монго ідентифікатор' })
	@Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
	_id: string;

	@ApiProperty({ example: 'Role@gmail.com', description: 'Поштовий адрес' })
	@Prop({ type: String, required: true, unique: true, index: true })
	email: string;

	@ApiProperty({ example: '12345678', description: 'Пароль' })
	@Prop({ type: String, required: true, select: false, set: (v: string) => hashPassword(v) })
	password: string;

	@ApiProperty({ example: 'true', description: 'Заблокований или нет' })
	@Prop({ type: Boolean, default: false })
	banned: boolean;

	@ApiProperty({ example: 'За шахрайство', description: 'Причина блокування' })
	@Prop({ type: String })
	banReason: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
