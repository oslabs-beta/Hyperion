import { Database } from '../models/database'; 

/**
 * 
 * @param info 
 * @returns an object with properties filled in 
 */
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

