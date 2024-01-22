-- initdb.sql

-- Створення таблиці користувачів
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  "userName" VARCHAR(255) NOT NULL,
  "isAdmin" BOOLEAN DEFAULT false
);

-- Додавання користувачів
INSERT INTO users (email, password, "userName", "isAdmin") VALUES
  ('user1@example.com', 'hashed_password1', 'John Doe', true),
  ('user2@example.com', 'hashed_password2', 'Jane Doe', false),
  ('user3@example.com', 'hashed_password3', 'Bob Smith', true),
  ('user4@example.com', 'hashed_password4', 'Alice Johnson', false),
  ('user5@example.com', 'hashed_password5', 'Charlie Brown', true);

-- Створення таблиці розкладу поїздів
CREATE TABLE IF NOT EXISTS schedule (
  id SERIAL PRIMARY KEY,
  "departureTime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "arrivalTime" TIMESTAMP,
  status VARCHAR(10) NOT NULL DEFAULT 'On Time',
  "from" VARCHAR(255) NOT NULL,
  "to" VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  "carriageType" VARCHAR(20) NOT NULL DEFAULT 'Compartment', -- Added comma here
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Додавання записів у розклад
INSERT INTO schedule ("departureTime", "arrivalTime", status, "from", "to", price, "carriageType", "createdAt", "updatedAt") VALUES
  ('2022-01-01 12:00:00', '2022-01-01 15:00:00', 'On Time', 'CityA', 'CityB', 50.00, 'Compartment', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-02 14:00:00', '2022-01-02 17:00:00', 'Delayed', 'CityB', 'CityC', 60.00, 'Second Class', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-03 10:00:00', '2022-01-03 13:00:00', 'On Time', 'CityC', 'CityD', 70.00, 'Luxe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-04 08:00:00', '2022-01-04 11:00:00', 'Delayed', 'CityD', 'CityE', 80.00, 'Compartment', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-05 16:00:00', '2022-01-05 19:00:00', 'On Time', 'CityE', 'CityF', 90.00, 'Second Class', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-06 18:00:00', '2022-01-06 21:00:00', 'Delayed', 'CityF', 'CityG', 100.00, 'Luxe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-07 22:00:00', '2022-01-08 01:00:00', 'On Time', 'CityG', 'CityH', 110.00, 'Compartment', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-09 20:00:00', '2022-01-09 23:00:00', 'Delayed', 'CityH', 'CityI', 120.00, 'Second Class', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('2022-01-10 12:00:00', '2022-01-10 15:00:00', 'On Time', 'CityI', 'CityJ', 130.00, 'Luxe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
