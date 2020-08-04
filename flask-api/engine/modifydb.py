import sqlite3

conn = sqlite3.connect('secure.db')
print "Opened database successfully"

conn.execute('CREATE TABLE auth (name TEXT, pwd TEXT)')
print "Table created successfully"
conn.close()