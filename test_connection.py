from sqlalchemy import create_engine, text
engine = create_engine('mysql://adminP5:Developer123!@localhost/login_p5')
connection = engine.connect()
result = connection.execute(text("SELECT 1"))
print(result.fetchone())
connection.close()