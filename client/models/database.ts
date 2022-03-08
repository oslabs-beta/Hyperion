
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

// ---------- interfaces ----------
export interface Query {
  id: number;  // id in internal database
  label: string;
  queryString: string; 
  params: Array<Array<string|number>>
}

export interface Table {
  id: number;  // id in internal database
  label: string;
  tablesGenerated: boolean;
  attributes: { [id: number] : Attribute }
}

export interface Attribute {
  id: number; 
  attributeName: string; 
  datatypeId: number
}

export interface DatabaseConstructor {
  id: number,
  label: string,
  port?: number,
  pgDatabaseName?: string,
  sslMode?: string,
  latency?: number,
}



export interface NewDatabaseForm {
  dbInfo: {
    name: string,
    connectionType: 'URI'|'CONNECTION_PARAMS',
  },
  connectionType: 'URI'|'CONNECTION_PARAMS',
  connectionString: string,
  connectionDetails: {
    host: string,
    port: number,
    database: string,
    username: string, 
    password: string,
  }
}

export interface DatabaseReducerState {
  [databases: string] : { [ id: number ]: Database}
};



