

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
