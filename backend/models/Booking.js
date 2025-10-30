export default (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Booking;
};
