

const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance
// const sequelize = new Sequelize('Url_shortener', 'postgres', 'Deep@k2110', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const connectionString = 'postgres://url_shortener_2nqg_user:zAkVxXSbUgG0vnoagmOAV5Utuukrs9pB@dpg-cmgjat821fec739s5odg-a.singapore-postgres.render.com/url_shortener_2nqg';

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
