CREATE TABLE IF NOT EXISTS posts (
	id serial PRIMARY KEY,
	title varchar (20000) NOT NULL,
	body varchar (20000) NOT NULL
);
