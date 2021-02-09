BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);



INSERT INTO users (email, first_name, last_name,password) VALUES
  ('ebraheem@gmail.com', 'Ebraheem', 'Ghantous', '123123'),
  ('haneen@gmail.com', 'Haneen', 'Awad', '123123'),
  ('alaa@gmail.com', 'Alaa', 'Lathqani', '123123'),
  ('sawaed@gmail.com', 'Mohamad', 'Sawaed', '123123')
;



COMMIT;