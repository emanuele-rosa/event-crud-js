const mongoose = require("mongoose");
const UserModel = require("../model/User");
const EventModel = require("../model/Event");
const UserSchema = mongoose.model("User", UserModel);
const EventSchema = mongoose.model("Event", EventModel);
const { randomUUID } = require("crypto");

const bcrypt = require("bcrypt");

exports.install = async (req, res) => {
  try {
    const initialUsers = [
      {
        name: "Alice",
        email: "alice@example.com",
        password: "password123",
        confirmPassword: "password123",
        isAdmin: true,
        token: "token123",
      },
      {
        name: "Bob",
        email: "bob@example.com",
        password: "password123",
        confirmPassword: "password123",
        isAdmin: false,
        token: "token456",
      },
      {
        name: "Carol",
        email: "carol@example.com",
        password: "password123",
        confirmPassword: "password123",
        isAdmin: false,
        token: "token789",
      },
      {
        name: "David",
        email: "david@example.com",
        password: "password123",
        confirmPassword: "password123",
        isAdmin: true,
        token: "token101",
      },
      {
        name: "Eve",
        email: "eve@example.com",
        password: "password123",
        confirmPassword: "password123",
        isAdmin: false,
        token: "token102",
      },
    ];

    const salt = await bcrypt.genSalt(10);
    const hashedUsersData = await Promise.all(
      initialUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const hashedConfirmPassword = await bcrypt.hash(
          user.confirmPassword,

          salt
        );
        return {
          ...user,
          password: hashedPassword,
          confirmPassword: hashedConfirmPassword,
        };
      })
    );

    const initialEvents = [
      {
        name: "Event 1",
        place: "Place 1",
        date: new Date(),
        description: "Description for Event 1",
        createdBy: randomUUID(),
      },
      {
        name: "Event 2",
        place: "Place 2",
        date: new Date(),
        description: "Description for Event 2",
        createdBy: randomUUID(),
      },
      {
        name: "Event 3",
        place: "Place 3",
        date: new Date(),
        description: "Description for Event 3",
        createdBy: randomUUID(),
      },
      {
        name: "Event 4",
        place: "Place 4",
        date: new Date(),
        description: "Description for Event 4",
        createdBy: randomUUID(),
      },
      {
        name: "Event 5",
        place: "Place 5",
        date: new Date(),
        description: "Description for Event 5",
        createdBy: randomUUID(),
      },
    ];

    await UserSchema.insertMany(hashedUsersData);
    await EventSchema.insertMany(initialEvents);

    return res.status(200).json({
      message: "Database has been populated with initial users and events.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while populating the database.",
      error: error.message,
    });
  }
};
