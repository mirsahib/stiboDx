import { DataTypes, Model, Sequelize } from "sequelize";
//connection instances

class User extends Model {
    declare id: string
    declare firstName: string
    declare lastName: string
    declare password: string
    declare email: string
}

const initUserModel = (conn: Sequelize): void => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize: conn,
            modelName: 'User',
        }
    );
    User.sync().catch(error => {
        console.log('Failed to create user table', error)
    })
};

export { User, initUserModel };