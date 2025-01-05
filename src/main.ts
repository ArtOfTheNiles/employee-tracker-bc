import fs from 'node:fs';
import dotenv from 'dotenv';
import pg from 'pg';

import serviceSelector from './prompts/serviceSelector.js';
import { welcomeHeader } from './prompts/inserts.js';

dotenv.config();
const { Client } = pg;
const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number.parseInt(process.env.PORT ? process.env.PORT : '5432'),
});

async function main() {
    tempStartup();
    console.log(welcomeHeader);
    await serviceSelector();
}

async function tempStartup() {
    await client.connect();
    try {
        const schema = await fs.readFile('./server/schema/schema.sql', 'utf8', (error) => {
            if(error){ return console.error(error); }
            console.log('\nSchema Files loaded Successfully!')
        });
        const seeds = await fs.readFile('./server/schema/seeds.sql', 'utf8', (error) => {
            if(error){ return console.error(error); }
            console.log('Database successfully Seeded!')
        });
        if(schema != null) {
            client.query(schema);
        }
        if(seeds != null) {
            client.query(seeds);
        }
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
}

main();