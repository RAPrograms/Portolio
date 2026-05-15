import Database from 'better-sqlite3';
import { resolve } from 'path';

const path = resolve('static/db/data.db')

export default new Database(path, { verbose: console.log });