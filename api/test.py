import psycopg2

URI = "postgres://dhrmhtfbhqplfe:1ad5bfc52102553cd11f612e44f6fa0f626ee7f16bd3a4ee3c7e7712677dbf87@ec2-52-212-228-71.eu-west-1.compute.amazonaws.com:5432/d5nnlffhse9ujv"

# Connect to your postgres DB
conn = psycopg2.connect(URI)

# Open a cursor to perform database operations
cur = conn.cursor()

query = """ INSERT INTO users (nickname, riddle)
                    VALUES (%s, %s)
                    ON CONFLICT (nickname) DO UPDATE
                    SET riddle = %s"""

record_to_insert = ("riddler", "sups", "sups")

cur.execute(query, record_to_insert)

conn.commit()

count = cur.rowcount

cur.execute("SELECT * FROM users")

records = cur.fetchall()

print([{ "name": user[1], "riddle": user[2] } for user in records])