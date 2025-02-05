

const { Sequelize, DataTypes } = require('sequelize');

// for localhost

// const sequelize = new Sequelize('Url_shortener', 'postgres', 'Deep@k2110', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// for docker 

// const sequelize = new Sequelize('postgres123', 'postgres', 'Deep@k2110', {
//   host: 'db',
//   dialect: 'postgres',
// });

const connectionString = 'postgresql://postgres.fgwzgcyahgjdidomzqva:Deep@k2110@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // To disable SSL certificate validation (use in development, not recommended for production)
    },
  },
  logging: false, // Set to true if you want to see SQL logs
});

// Define your model
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false, validate: { len: [3, 15] } },
  resetToken: { type: DataTypes.STRING, defaultValue: null },
  resetTokenExpiry: { type: DataTypes.DATE, defaultValue: null },
}, {
  timestamps: true,
});

// Sync the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database and tables created!');
  } catch (error) {
    console.error('Error creating database and tables:', error);
  }
})();

module.exports = User;
