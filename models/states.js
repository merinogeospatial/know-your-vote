module.exports = function(sequelize, DataTypes) {
  var States = sequelize.define("States", {
    name: DataTypes.STRING,
    abrName: DataTypes.STRING,
    yayCount: DataTypes.INTEGER,
    nayCount: DataTypes.INTEGER,
    long: DataTypes.FLOAT(10, 8),
    lat: DataTypes.FLOAT(10, 8)
  });
  return States;
};
