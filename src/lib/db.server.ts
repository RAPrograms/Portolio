import Database from 'better-sqlite3';
import { resolve } from 'path';

const path = resolve('data/data.db')

export default new Database(path, {
    verbose: (import.meta.env.DEV)? console.log:null,
    readonly: true
});