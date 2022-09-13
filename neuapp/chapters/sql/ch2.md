---
title: 'Chapter 2: Ways to Put Data into a Database'
description: Discover the
prev: null
next: /sql/ch3
type: chapter
id: 1
courseId: sql
---


<exercise id="1" title="Motivations" >

## Motivations

</exercise>

<exercise id="2" title="Common SQL Databases">

Flavours of SQL

- sqlite - DB = just a file
- postgres = a server (a computer sat somewhere)
- mysql = a server

</exercise>

<exercise id="3" title="Ways to Put Data into a Database">

- pandas.to_sql = quick, easy but not functionality (really)

For reference - wouldn't suggest learning unless you really need them:
- (sqlite specific) = sqlite Python standard library module - https://docs.python.org/3/library/sqlite3.html
- (postgres specific) = psycopg2 = driver for postgres

ORM (SQLAlchemy)
- work many databases, with the same code
- sqlite, postgres, mysql all supported

#  less flexible -> more flexible, does less for you
pd.to_sql -> sqlachemy -> posycog2

</exercise>

<exercise id="4" title="Choosing How to Put Data into a Database">

SQL injection - danger of writing SQL strings 

</exercise>

<exercise id="5" title="Ways to interact with databases">

Opening connections, cursor, engine

</exercise>
