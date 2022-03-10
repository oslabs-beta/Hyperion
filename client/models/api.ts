export interface GetUserInfoRequestResponse {
  userId: number, 
  userData: Array<{
    dbId: number, 
    dbName: string,
    connectionType: 'URI' | 'CONNECTION_PARAMS',
    queries: Array<{
      qid: number,
      queryName: string,
      connectionType: string, 
      query: {
        queryString: string,
        queryParams: Array<Array<string>>
        maxConnections?: number,
        throttle?: number,
        repeat?: number
      }
    }>
  }>
}


// request body for adding a new database
export interface NewDatabaseRequestBody {
  dbInfo: {
    dbname: string, 
    connectionType: 'URI'|'CONNECTION_PARAMS',
    connectionString: string,
    connectionParams: {
      host: string | null,
      port: number | null,
      database: string | null,
      username: string | null , 
      password: string | null,
      sslMode: string | null , 
    }
  }
}


export interface NewQueryRequestBody {
  dbId: number, 
  queryName: string, 
  query: {
    queryString: string, 
    queryParams: Array<Array<string|number>>,
    maxConnections?: number, 
    throttle?: number, 
    repeat?: boolean
  }
}


export interface EditQueryRequestBody {
  queryId: number, 
  queryName: string, 
  query: {
    queryString: string, 
    queryParams: Array<Array<string|number>>,
    maxConnections?: number, 
    throttle?: number, 
    repeat?: boolean
  }
}


export interface RunTestResponse {
  summaryStats: {
    min: number,
    max: number, 
    median: number, 
    mean: number, 
    stdDev: number, 
    q1: number, 
    q3: number,
  }, 
  testData: Array<{
    queryTime: number, 
    method: 'EXPLAIN' | 'QUERY',
    timestamp: Date
  }>
}

export interface UserSignupBody {
  userInfo: {
    email: string, 
    name: string, 
    password: string
  }
}

export interface UserLoginBody {
  userInfo: {
    password: string, 
    email: string
  }
}


export interface UserLoginSuccessResponse {
  authenticated: true, 
  userId: number
}


