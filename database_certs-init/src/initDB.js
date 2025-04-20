import Database from 'better-sqlite3';
import fs from 'fs';

const databasePath = '/app/data/database.sqlite';
const database = new Database(databasePath);

const schemas = fs.readdirSync('./schema');
const test = fs.readFileSync(`./test/test.sql`, 'utf-8');

schemas.forEach((file) => {
	const sql = fs.readFileSync(`./schema/${file}`, 'utf-8');
	database.exec(sql);
});

// database.exec(test);

console.log('Database initialized successfully!');