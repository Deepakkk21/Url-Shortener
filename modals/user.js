

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

const connectionString = 'postgresql://url_shortener_8qy7_user:7eDdT4rT14CHao4TPhsvBykO67gqrNjn@dpg-cre9bqlsvqrc73fgs5bg-a/url_shortener_8qy7';

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
