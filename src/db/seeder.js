#! /usr/bin/env node

require('dotenv/config')
const { Client } = require('pg');

const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author VARCHAR(255),
  text VARCHAR(1000),
  added DATE DEFAULT CURRENT_DATE
);

INSERT INTO messages (author, text) VALUES
  ('Bryan', 'Lorem ipsum'),
  ('Odin', 'Lorum ipsem'),
  ('Damon', 'Acb');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
