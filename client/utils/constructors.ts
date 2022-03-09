import { Database } from '../models/database'; 
import { DatabaseConstructorParams } from '../models/database';

/**
 * 
 * @param info 
 * @returns an object with properties filled in 
 */
export const constructDatabase = (info: DatabaseConstructorParams): Database => {
  const {id, label, port, pgDatabaseName, sslMode, latency, connectionType} = info;
  return {
    id: id,  
    label: label, 
    port: port || null, 
    connectionType: connectionType,
    pgDatabaseName: pgDatabaseName || null, 
    sslMode: sslMode || null,
    latency: latency || null,
    queries: {},
  }
}

