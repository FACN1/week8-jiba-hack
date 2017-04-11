BEGIN;

DROP TABLE IF EXISTS kitty cascade;

CREATE TABLE kitty (
  id SERIAL PRIMARY KEY,
  transaction_date DATE DEFAULT CURRENT_DATE,
  name VARCHAR(200) NOT NULL,
  transaction_value INT NOT NULL
);

INSERT INTO kitty (name, transaction_value) VALUES
('Mario', 25), ('Edgar', 25), ('Eoin', -50);

COMMIT;
