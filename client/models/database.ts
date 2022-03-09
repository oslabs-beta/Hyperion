
export interface Database {
  id: number;
  port?: number;
  connectionType: 'URI'|'CONNECTION_PARAMS';
  pgDatabaseName?: string;
  label: string;
  sslMode?: string;
  queries: { [id: number] : Query };
  latency?: number;
}

// ---------- interfaces ----------
export interface Query {
  id: number;  // id in internal database
  label: string;
  queryString: string; 
  params: Array<Array<string|number>>;
  maxConnections?: number, 
  throttle?: number, 
  repeat?: number
}

export interface Attribute {
  id: number; 
  attributeName: string; 
  datatypeId: number
}

export interface DatabaseConstructor {
  id: number,
  label: string,
  connectionType: 'URI'|'CONNECTION_PARAMS';
  port?: number,
  pgDatabaseName?: string,
  sslMode?: string,
  latency?: number,
}

export interface DatabaseConstructorParams {
  id: number,
  label: string,
  connectionType: 'URI'|'CONNECTION_PARAMS';
  port?: number,
  pgDatabaseName?: string,
  sslMode?: string,
  latency?: number,
}





export interface NewQuery {
  label: string,
  databaseId: number, 
  queryId: number, 
  query: string,
  params: Array<Array<string|number>>
}

export interface DatabaseReducerState {
  [databases: string] : { [ id: number ]: Database}
};


