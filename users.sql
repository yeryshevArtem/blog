CREATE TABLE users (
	id serial PRIMARY KEY,
	username varchar (20) NOT NULL UNIQUE,
	email varchar (50) NOT NULL,
  salt_password varchar (40) NOT NULL,
  hashed_password varchar (40) NOT NULL,
	role varchar (50) NOT NULL,
	created_at timestamptz,
	modified_at timestamptz
);
