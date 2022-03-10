# API Endpoints

## Database endpoints

### Add a new database to user's list

POST to `/api/db/new` with a request body. You can use either a connection string or connection parameters, but not both. JSON example using URI:
```JSON
{
  "dbInfo": {
    "dbname": "starwars_database",
    "connectionType": "URI",
    "connectionString": "postgres://username:secretpassword@castor.db.elephantsql.com/db1",
    "connectionParams": {
        "host": null,
        "port": null,
        "database": null,
        "username": null,
        "password": null,
        "sslMode": null
    }
  }
}
```
JSON example using CONNECTION_PARAMS:
```JSON
{
  "dbInfo": {
    "dbname": "starwars_database",
    "connectionType": "CONNECTION_PARAMS",
    "connectionString": null,
    "connectionParams": {
        "host": "aws.com",
        "port": 5432,
        "database": "db1",
        "username": "admin",
        "password": "hello123",
        "sslMode": "require"
    }
  }
}
```
Note: `connectionType` may only be `URI` or `CONNECTION_PARAMS`. The key `dbname` is the label for the database. The object returned will contain the id of the newly created database:
```JSON
{
  "dbInfo": {
    "id": 5
  }
}
```

### Remove database from list

DELETE to `/api/db/delete`. You can make the request as such:
```JSON
{
  "dbInfo": {
    "id": 5
  }
}
```

### Run tests on database

POST request to `/api/db/runtests` with the query you want to test:
```JSON
{
    "queryId": 1
}
```
If successful, the results will contain the following elements:
```JSON
{
  "summaryStats": {
    "min": <Number>,
    "max": <Number>,
    "median": <Number>,
    "mean": <Number>,
    "stdDev": <Number>,
    "q1": <Number>,
    "q3": <Number>
  },
  "testData": [
    {
      "queryTime": <Number>,
      "method": <String>,
      "timestamp": <Date>
    },
    {
      "queryTime": <Number>,
      "method": <String>,
      "timestamp": <Date>
    },
    ...
  ]
}
```

## User endpoints

### Signup route   
  
POST to `/api/user/new` with a request body.  
Body request example in JSON:
```JSON
{
    "userInfo": {
        "email": "user@email.com",
        "name": "User",
        "password": "mypassword"
    }
}
```
On success will return status `200` and a plaintext `User successfully created` message.  
Will fail if the email already exists in the database. 

### Log in route

POST to `/api/user/login` with a request body.  
Body request example in JSON:
```JSON
{
    "userInfo": {
        "email": "user@email.com",
        "password": "mypassword123"
    }
}
```

On success will return a status code `200` with an object defined as such:
```
{
  "authenticated": <Boolean>,
  "userId": <Integer>
}
```

Here's an example in JSON:
```JSON
{
    "authenticated": true,
    "userId": 7
}
```

### Log out route

POST to `/api/user/logout`. No request body needed.
A status code of `200` indicates success.

### Get info route

GET to `/api/user/getinfo`. No request body needed.
Will return the following in JSON format:

```JSON
{
  "userId": 1,
  "userData": [
    {
      "dbId": 10,
      "dbName": "starwars_test_encryption2",
      "connectionType": "URI",
      "connectionString": "postgres://aws.com",
      "connectionParams": {
        "host": null,
        "port": null,
        "database": null,
        "username": null,
        "password": null,
        "sslMode": null
      },
      "queries": [
        {
          "queryId": 1,
          "queryName": "testquery1",
          "query": {
              "queryString": "SELECT 1",
              "queryParams": [[]],
              "maxConnections": 1,
              "throttle": 100,
              "repeat": 2
          }
        },
        {
          "queryId": 5,
          "queryName": "testquery2",
          "query": {
              "queryString": "SELECT 1",
              "queryParams": [[]],
              "maxConnections": 1,
              "throttle": 50,
              "repeat": 1
          }
        },
        ...
      ]
    },
    {
      "dbId": 11,
      "dbName": "starwars_test_encryption2",
      "connectionType": "URI",
      "connectionString": "postgres://aws.com",
      "connectionParams": {
        "host": null,
        "port": null,
        "database": null,
        "username": null,
        "password": null,
        "sslMode": null
      },
      "queries": []
    },
    ...
  ]
}
```

## Query endpoints

### New query

POST to `/api/query/new`  
Request body example in JSON:
```JSON
{
    "dbId": 10,
    "queryName": "testquery2",
    "query": {
        "queryString": "SELECT 1",
        "queryParams": [[]],
        "maxConnections": 1,
        "throttle": 50,
        "repeat": 1
    }
}
```


### Remove query

DELETE to `/api/query/remove`  
Request body example in JSON:
```JSON
{
    "queryId": 1
}
```


### Edit query

PATCH to `/api/query/update`  
Request body example in JSON:
```JSON
{
    "queryId": 1,
    "queryName": "newName",
    "query": {
        "queryString": "SELECT 2",
        "queryParams": [[]],
        "maxConnections": 1,
        "throttle": 100,
        "repeat": 2
    }
}
```


