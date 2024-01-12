

const { Sequelize, DataTypes } = require('sequelize');

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

const URL = sequelize.define('URL', {
  originalUrl: { type: DataTypes.STRING, allowNull: false },
  shortUrl: { type: DataTypes.STRING, allowNull: false },
  clicks: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  timestamps: true,
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Database and tables created!');
  } catch (error) {
    console.error('Error creating database and tables:', error);
  }
})();

module.exports = URL;
