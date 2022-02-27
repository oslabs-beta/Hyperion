


// class 
export default class Database {
    // properties 
    id: Number;
    port: Number;
    pgDatabaseName: String;
    label: String;
    sslMode: String;
    user: String;
    isConnected: Boolean;
    queries: { [id: number] : Query };
    tables: { [ id: number ] : Table }
    // addQuery: () => void

    constructor(
        id: Number,
        port: Number,
        pgDatabaseName: String,
        label : String,
        sslMode: String,
        user: String,
        isConnected: Boolean
    ) {
        this.id = id; 
        this.port = port; 
        this.pgDatabaseName = pgDatabaseName;
        this.label = label;
        this.sslMode = sslMode; 
        this.user = user; 
        this.isConnected = isConnected;
        this.queries = {};
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

    getQueries = () => { Object.values(this.queries); }
    
    getTables = () => { Object.values(this.tables); }

    deepCopy = () => { return JSON.parse(JSON.stringify(this)); }

}

// ---------- interfaces ----------
export interface Query {
    id: number;  // id in internal database
    queryString: string; 
}

interface Table {
    id: number;  // id in internal database
    label: string;
    tablesGenerated: boolean;
    attributes: { [id: number] : Attribute }
}

interface Attribute {
    id: number; 
    attributeName: string; 
    datatypeId: number
}

