


// class 
export default class Database {
  // properties 
  id: number;
  port: number;
  pgDatabaseName: string;
  label: string;
  sslMode: string;
  user: string;
  isConnected: boolean;
  queries: { [id: number] : Query };
  tables: { [ id: number ] : Table };
  latency: number;
  // addQuery: () => void

  constructor(
    id: number,
    port: number,
    pgDatabaseName: string,
    label : string,
    sslMode: string,
    user: string,
    isConnected: boolean,
    latency?: number,
  ) {
    this.id = id; 
    this.port = port; 
    this.pgDatabaseName = pgDatabaseName;
    this.label = label;
    this.sslMode = sslMode; 
    this.user = user; 
    this.isConnected = isConnected;
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


export interface NewDatabaseForm {
  isConnectingByUri: boolean;
  label: string; 
  uri? : string;
  host?: string;
  port?: number;
  database?: string; 
  username?: string; 
  password?: string; 
  ssl?: string; // might change to option of
}