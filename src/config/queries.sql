DROP TABLE if EXISTS ad;
DROP TABLE if EXISTS category;

CREATE TABLE category
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(100)
);


CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price REAL,
    picture VARCHAR(255),
    location VARCHAR(100),
	createdAt DATE,
  	category_id INTEGER NOT NULL,
	CONSTRAINT fk_ad_category
	FOREIGN KEY (category_id)
	REFERENCES category(id)
);

INSERT INTO category (name) VALUES ('vêtements'), ('voiture'), ('autres');

INSERT INTO ad (title, description, owner, price, location, createdAt, category_id) VALUES 
('Vieux jeans troués', 'Jeans d occasion en bon état, quelques trous.', 'Nick', 200, 'Bordeaux', '2023-09-01', 1),
('T-shirt hello world', 'T-shirt neuf avec l inscription "Hello World".', 'Pierre', 9.99, 'Lyon', '2023-09-02', 2),
('Chaussettes Wild Code School', 'Chaussettes aux couleurs de Wild Code School.', 'Anna', 4.49, 'Paris', '2023-09-01', 2),
('R5 pour pièces', 'Voiture Renault R5 pour pièces détachées.', 'Patrick', 100, 'Bordeaux', '2023-09-10', 3),
('DeLorean DMC-12', 'Voiture DeLorean DMC-12, modèle célèbre de Retour vers le futur.', 'Marty', 70000, 'Paris', '2023-09-13', 1),
('Peugeot 206', 'Voiture d occasion en bon état.', 'Amélie', 2000, 'Lyon', '2023-09-05', 3),
('Opel Corsa', 'Voiture Opel Corsa en bon état.', 'Lucie', 1000, 'Bordeaux', '2023-09-06', 2),
('Jeu de cartes Pokémon collector', 'Jeu de cartes Pokémon en édition collector.', 'Jean', 350, 'Lyon', '2023-09-06',1),
('Chaîne hi-fi complète', 'Ensemble complet de chaîne hi-fi en bon état.', 'Jean', 80, 'Paris', '2023-09-01', 3);


-- Ex 1
-- SELECT * FROM ad; 

-- SELECT * FROM ad WHERE location = 'Bordeaux';

-- DELETE FROM ad WHERE price > 40; 

-- UPDATE ad SET price = 0 WHERE createdAt = '2023-09-01'

-- SELECT AVG(price) FROM ad WHERE location = 'Paris'

-- SELECT location, AVG(price) as 'prix moyen des annonces' FROM ad GROUP BY location

-- Ex 2
SELECT * from ad as art JOIN category as cat ON cat.id = art.category_id where cat.name = 'vêtements';
SELECT * FROM ad WHERE category_id = "2" OR category_id = "1";
SELECT AVG(price) FROM ad WHERE category_id = "3" ;
SELECT title FROM ad WHERE title LIKE 'v%';

-- Ex 2 (joiture)
SELECT * from ad as a JOIN category as c ON c.id = a.category_id where c.name = 'vêtements';
SELECT * FROM ad as a JOIN category as c ON a.category_id = c.id where c.name = 'vêtements' or c.name = 'voiture';
SELECT AVG(price) FROM ad as a JOIN category as c ON a.category_id = c.id WHERE category_id = "3" ;
SELECT title FROM ad as a JOIN category as c ON a.category_id = c.id WHERE title LIKE 'v%' ;