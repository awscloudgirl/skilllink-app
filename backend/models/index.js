import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import UserModel from "./User.js";
import BookingModel from "./Booking.js";

// Handle ES module path utilities
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON config manually
const configPath = path.join(__dirname, "../config/config.json");
const configFile = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// Create Sequelize connection
export const sequelize = new Sequelize(config);

// Initialize models
export const User = UserModel(sequelize, DataTypes);
export const Booking = BookingModel(sequelize, DataTypes);

// Define relationships
Booking.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Booking, { foreignKey: "userId" });
