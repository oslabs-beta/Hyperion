
export default class Database {
  // properties 
  id: number;
  port?: number;
  pgDatabaseName?: string;
  label?: string;
  sslMode?: string;
  queries?: { [id: number] : Query };
  tables?: { [ id: number ] : Table };
  latency?: number;
  // addQuery: () => void

  constructor(data: DatabaseConstructor) {
    
    this.id = data.id; 
    this.port = data.port || undefined ; 
    this.pgDatabaseName = data.pgDatabaseName || undefined;
    this.label = data.label;
    this.sslMode = data.sslMode || undefined; 
    this.queries = {};
    this.latency = 0; // change this when new
  }

  addQuery = (query: Query) => {
    if (!this.queries[query.id]) {
      this.queries[query.id] = query; 
    }
      // TODO error handling 
  }

  addTable = (table: Table) => {
    if (!this.tables[table.id]) {
      this.tables[table.id] = table;
    }
    // TODO error handling 
  }

  deleteTable = (id: number) => {
    delete this.tables[id];
    // TODO error handling 
  }

  deleteQuery = (id: number) => {
    delete this.queries[id];
    // TODO error handling 
  }
  getQueries = () => { return Object.values(this.queries); }
  getTables = () => { return Object.values(this.tables); }
  deepCopy = () => { return JSON.parse(JSON.stringify(this)); }
}

// ---------- interfaces ----------
export interface Query {
  id: number;  // id in internal database
  queryString: string; 
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



