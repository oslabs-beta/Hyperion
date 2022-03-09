select 
u._id as uid,
db._id as dbid, 
db.database_name,
db.connection_type,
q._id as qid,
q.query_name,
q.query
from app.users u 
inner join app.databases db 
on db.user_id = u._id 
left join app.queries q
on q.db_id = db._id
where u._id = 1;
