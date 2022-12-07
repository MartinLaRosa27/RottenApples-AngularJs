CREATE SCHEMA IF NOT EXISTS final;
USE final;

CREATE TABLE IF NOT EXISTS usuario(
_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
username VARCHAR(50) NOT NULL,
email VARCHAR(60) NOT NULL,
password VARCHAR(255) NOT NULL,
administrador INTEGER(1) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pelicula(
_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
titulo VARCHAR(255) NOT NULL,
anio INTEGER(11) NOT NULL,
img VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS review(
_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
descripcion VARCHAR(144) NOT NULL,
estrellas INTEGER(1) NOT NULL,
createdAt DATE NOT NULL,
peliculaId INTEGER(11) NOT NULL,
usuarioId INTEGER(11) NOT NULL,
CONSTRAINT FOREIGN KEY fk1(usuarioId) REFERENCES usuario(_id) ON DELETE CASCADE,
CONSTRAINT FOREIGN KEY fk2(peliculaId) REFERENCES pelicula(_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS seguimiento(
_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
bloqueado INTEGER(1) NOT NULL DEFAULT 0,
usuarioId INTEGER(11) NOT NULL,
seguidorId  INTEGER(11) NOT NULL,
CONSTRAINT FOREIGN KEY fk1(usuarioId) REFERENCES usuario(_id) ON DELETE CASCADE,
CONSTRAINT FOREIGN KEY fk2(seguidorId) REFERENCES usuario(_id) ON DELETE CASCADE
);

INSERT INTO pelicula(titulo, anio, img) VALUES
('Morbius', 2021, 'https://m.media-amazon.com/images/M/MV5BNTA3N2Q0ZTAtODJjNy00MmQzLWJlMmItOGFmNDI0ODgxN2QwXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_QL75_UX190_CR0,2,190,281_.jpg'),
('Lightyear', 2022, 'https://m.media-amazon.com/images/M/MV5BYTg2Zjk0ZTctM2ZmMi00MDRmLWJjOGYtNWM0YjBmZTBjMjRkXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_QL75_UX190_CR0,0,190,281_.jpg'),
('Avengers: Endgame', 2019, 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2019/04/avengers-endgame-posters-estreno-1.jpeg?resize=724%2C1024&quality=80&ssl=1'),
('Uncharted', 2022, 'https://m.media-amazon.com/images/M/MV5BOTNkN2ZmMzItOTAwMy00MmM5LTg5YTgtNmE5MThkMDE2ODJiXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg'),
("Ghostbusters", 1984, "https://m.media-amazon.com/images/M/MV5BMjI5MjMxMTc2OV5BMl5BanBnXkFtZTgwMzE3MjYyMTE@._V1_.jpg");

INSERT INTO usuario(username, email, password, administrador) VALUES
("administrador01", "administrador01@mail.com", "$2y$10$J/tVsqACxzI2sf7Le42Ytuf0muROZCqMY.YGyjR34ASMnOigLVrtu", 1),
("dibuMartinez23", "dibuMartinez23@mail.com", "$2y$10$d4wtNFXxCrrkYYWxiSFTjusBGJ2HbHZgk682WgjNBxWFrK2MbHm7C", 0),
("messi2022", "messi2022@mail.com", "$2y$10$R14VpDs3GPnVHdi7Iig8AeIZM2TIU14nmRjy7WHA.zezkj0lr3rK6", 0),
("ronaldo07", "ronaldo07@mail.com", "$2y$10$drzMTXqgN49wcanvn4UV4uwcvvqeeoB6lG75HoSor1KtzPn1IaAp6", 0);

INSERT INTO seguimiento(usuarioId, seguidorId) VALUES
(3,2), (2,3);

INSERT INTO review(descripcion, estrellas, createdAt, peliculaId, usuarioId) VALUES
("La mejor pelicula de la historia!!!", "5", DATE(NOW()), "1", "2"),
("La pelicula del año.", "4", DATE(NOW()), "3", "3"),
("No aparece Woody :(", "1", DATE(NOW()), "2", "4");