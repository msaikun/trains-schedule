import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty }                    from '@nestjs/swagger';

interface UserCreationAttrs {
	email    : string;
	password : string;
	userName : string;
	isAdmin  : boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique id' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'user@gmail.com', description: 'email address' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: '12345678', description: 'password' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({ example: 'Maryna Saikun', description: 'user name' })
	@Column({ type: DataType.STRING, allowNull: true })
	userName: string;

	@ApiProperty({ example: true, description: 'is admin' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	isAdmin: boolean;
}
