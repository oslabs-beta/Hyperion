import { Database } from '../models/database'; 
export const constructDatabase = (info: DatabaseConstructorParams): Database => {
  
  const {id, label, port, pgDatabaseName, sslMode, latency} = info;
  return {
    id: id,  
    label: label, 
    port: port || null, 
    pgDatabaseName: pgDatabaseName || null, 
    sslMode: sslMode || null,
    latency: latency || null,
    queries: {},
    tables: {}
  }
}

export interface DatabaseConstructorParams {
  id: number,
  label: string,
  port?: number,
  pgDatabaseName?: string,
  sslMode?: string,
  latency?: number,
}


/*

export interface Database {
  id: number;
  port?: number;
  pgDatabaseName?: string;
  label?: string;
  sslMode?: string;
  queries: { [id: number] : Query };
  tables: { [ id: number ] : Table };
  latency?: number;
}
*/