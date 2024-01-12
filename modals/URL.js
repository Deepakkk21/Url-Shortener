

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Url_shortener', 'postgres', 'Deep@k2110', {
  host: 'localhost',
  dialect: 'postgres',
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
