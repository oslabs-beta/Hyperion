# Hyperion
<center>
<img src="assets/logo.jpg"/>
</center>

**Note:** An overview of our security policies is available [here](/SECURITY.md). *Please read this document before using our app. Using our app constitues acknowledgment of the disclaimers presented in that document at the time of sign-up.*



# Table of Contents

> - [Description]()  
> - [Features]()  
> - [How to Use]()  
> - [Technologies]()  
> - [Dependencies]()  
> - [Collaborators]()  
> - [License]()  

# Description

Hyperion: A PostgreSQL analytic tool to test and compare actual dynamic query runtimes with query runtimes calculated by PostgreSQL's EXPLAIN ANALYZE profiling tool. 

# Features

> - Overview
> - Databases 
    >> - On the Database page, users can connect to their databases by either providing the database URI or manually providing connection details (host, port, database name, and user credentials)
<center>
<img src="assets/addingdatabase.gif"/>
</center>

> - Queries 
    >> - On the Queries page, users can select a database, input queries, and optional parameter placeholders. 
<center>
<img src="assets/addingquery.gif"/>
</center>

> - Run Tests 
    >> - On the Run Test page, users can select a database, and query. The run test function will then display the actual query runtime measured by the PostgreSQL server’s CPU clock time as well as query runtime provided via the explain analyze command and associated summary statistics (min, max, median, sd, q1,q3). 
<center>
<img src="assets/RunningTest.gif"/>
</center>



# How to Use

A hosted version is available [at this link](#).

If you prefer to run it locally, you can also fork and clone the repository and run the production version locally using `node server/server.js` at the root directory.


# Technologies

- Node
- React
- Redux
- PostgreSQL
- Typescript
- Material UI 
- Plotly.js

# Dependencies

- [express]()  
- [pg]()  
- [react]()  
- [react-dom]()  
- [cookie-parser]()

# Collaborators

- [Chloe Angel]()  
- [Sankari Ayyaluru]()  
- [Celene Chang]()  
- [Nick Ozawa]()     

# License

This project is available under the MIT License.