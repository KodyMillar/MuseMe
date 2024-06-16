CREATE DATABASE music_app;

USE music_app;

-- music_book table stores all the music books for sale
CREATE TABLE `music_app`.`music_book` (
  `Book_ID` INT NOT NULL AUTO_INCREMENT,
  `Book_Name` VARCHAR(100) NOT NULL,
  `Instrument` VARCHAR(100) NOT NULL,
  `Difficulty` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Book_ID`),
  UNIQUE INDEX `Book_ID_UNIQUE` (`Book_ID` ASC) VISIBLE);


INSERT INTO music_book (
    Book_Name,
    Instrument,
    Difficulty
)
VALUES
("Chopin - The Ultimate Piano Collection", "Piano", "Mixed"),
("Piano Repertoire 5", "Piano", "Grade 5");

ALTER TABLE music_book
ADD image_link varchar(100) NOT NULL;

UPDATE music_book
SET image_link = "ChopinPianoCollection.jpg"
WHERE Book_ID = 1;

UPDATE music_book
SET image_link = "PianoRepertoire5.jpg"
WHERE Book_ID = 2;

SELECT * FROM music_book;

INSERT INTO music_book (
	Book_Name,
    Instrument,
    Difficulty,
    Image_link
)
VALUES 
("Concerto in B Minor", "Violin", "Elementary", "ConcertoInBMinorViolin.jpg"),
("Dmitri Shostakovich Piano Concerto No. 2", "Piano", "Mixed", "DmitriShostakovichConcertoNo2.jpg"),
("The Great Piano Works of Franz Schubert", "Piano", "Mixed", "GreatPianoWorksOfFranzSchubert.jpg"),
("Intermediate J.S. Bach Favorites", "Piano", "Grade 4, Grade 5", "IntermediateJSBachFavorites.jpg"),
("Intermediate Pieces for Classical Guitar", "Guitar", "Intermediate", "IntermediateJSBachFavorites.jpg"),
("Johnny Cash - Guitar Music Book", "Guitar", "Intermediate", "JohnnyCashGuitar.jpg"),
("Piano Adventures", "Piano", "Grade 2", "PianoAdventures.jpg"),
("Sheet Music for Piano - Mozart", "Piano", "Mixed", "MozartSheetMusicForPiano.jpg"),
("Piano Repertoire Level 9", "Piano", "Grade 9", "PianoRepertoireLevel9.jpg"),
("First Etude Album for Violin", "Violin", "Intermediate", "ViolinEtudes.jpg");


CREATE TABLE song (
    Song_ID INT NOT NULL AUTO_INCREMENT,
    Song_Name VARCHAR(50) NOT NULL,
    Difficulty VARCHAR(20) NOT NULL,
    Image_Link VARCHAR(100) NOT NULL,
    pages INT NOT NULL,
    PRIMARY KEY (Song_ID)
);

CREATE TABLE book_song (
    Book_ID INT NOT NULL,
    Song_ID INT NOT NULL,
    FOREIGN KEY (Book_ID) REFERENCES music_book(Book_ID),
    FOREIGN KEY (Song_ID) REFERENCES song(Song_ID),
    PRIMARY KEY (Book_ID, Song_ID)
);

CREATE TABLE instrument (
	Instrument_ID INT NOT NULL AUTO_INCREMENT,
    Instrument VARCHAR(40) NOT NULL,
    PRIMARY KEY (Instrument_ID)
);

CREATE TABLE user_account (
	User_ID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(30) NOT NULL,
    Password VARCHAR(30) NOT NULL,
    PRIMARY KEY (User_ID)
);

CREATE TABLE instrument_players (
	Instrument_ID INT NOT NULL,
    User_ID INT NOT NULL,
    FOREIGN KEY (Instrument_ID) REFERENCES instrument(Instrument_ID),
    FOREIGN KEY (User_ID) REFERENCES user_account(User_ID),
    PRIMARY KEY (Instrument_ID, User_ID)
);

CREATE TABLE purchase (
	Book_ID INT NOT NULL,
    User_ID INT NOT NULL,
    FOREIGN KEY (Book_ID) REFERENCES music_book(Book_ID),
    FOREIGN KEY (User_ID) REFERENCES user_account(User_ID),
    PRIMARY KEY (Book_ID, User_ID)
);

CREATE TABLE song_progress (
    Book_ID INT NOT NULL,
    User_ID INT NOT NULL,
    Song_ID INT NOT NULL,
    progress ENUM ('Not Started', 'In Progress', 'Completed') NOT NULL,
    FOREIGN KEY (Book_ID) REFERENCES music_book(Book_ID),
    FOREIGN KEY (User_ID) REFERENCES user_account(User_ID),
    FOREIGN KEY (Song_ID) REFERENCES song(Song_ID),
    PRIMARY KEY (Book_ID, User_ID, Song_ID)
);

INSERT INTO song (Song_Name, Difficulty, Image_Link, pages) VALUES 
    ('Waltz No.7 in C# Minor', 'Grade 7', 'chopin/Waltz_No.7_In_C_Sharp_Minor', 7),
    ('Waltz in D-flat Major', 'Grade 7', 'chopin/Waltz_in_D-flat_major_Op.64_No.1', 3),
    ('Fantaisie Impromptu in C Minor', 'Grade 8', 'chopin/Fantaisie-Impromptu_in_C_Minor_Chopin', 5);


INSERT INTO book_song VALUES 
    (1, 1),
    (1, 2),
    (1, 3);
    
-- New query for 'chopin' folder
INSERT INTO song (Song_Name, Difficulty, Image_Link, pages) VALUES
    ('Etude Op.10 No.12 in C Minor Revolutionary', 'Grade 8', 'chopin/Etude_Op.10_No.12_in_C_Minor_Revolutionary', '5'),
    ('Nocturne Op 9 No 2 E Flat Major', 'Grade 7', 'chopin/Nocturne_Op_9_No_2_E_Flat_Major', '4'),
    ('Waltz in A Minor', 'Grade 6', 'chopin/Waltz_in_A_Minor', '2'),
    ('Waltz in F Minor Op 70 No. 2', 'Grade 7', 'chopin/Waltz_in_F_Minor_Op_70_No._2', '4'),
    ('Waltz Opus 69 No. 1 in A Major', 'Grade 6', 'chopin/Waltz_Opus_69_No._1_in_A_Major', '5');

INSERT INTO book_song VALUES
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8);
    
UPDATE song
SET Song_Name = 'Waltz Opus 69 No. 1 in A-flat Major'
WHERE Song_ID = 8;

ALTER TABLE user_account
ADD (
	First_Name VARCHAR(40) NOT NULL,
	Last_Name VARCHAR(40) NOT NULL,
	Email VARCHAR(40) NOT NULL
);

ALTER TABLE instrument_players
DROP CONSTRAINT instrument_players_ibfk_2;

ALTER TABLE Instrument_Players
MODIFY COLUMN User_ID CHAR(36) NOT NULL;

ALTER TABLE purchase
DROP CONSTRAINT purchase_ibfk_2;

ALTER TABLE purchase
MODIFY COLUMN User_ID CHAR(36) NOT NULL;

ALTER TABLE song_progress
DROP CONSTRAINT song_progress_ibfk_2;

ALTER TABLE song_progress
MODIFY COLUMN User_ID CHAR(36) NOT NULL;

ALTER TABLE user_account
MODIFY COLUMN User_ID CHAR(36) NOT NULL;

ALTER TABLE instrument_players
ADD CONSTRAINT inst_pl_user_fk FOREIGN KEY (User_ID) REFERENCES user_account(User_ID); 

ALTER TABLE purchase
ADD CONSTRAINT purchase_user_fk FOREIGN KEY (User_ID) REFERENCES user_account(User_ID);

ALTER TABLE song_progress
ADD CONSTRAINT song_prog_user_fk FOREIGN KEY (User_ID) REFERENCES user_account(User_ID);

SET SQL_SAFE_UPDATES = 0;

DELETE FROM user_account;

SET SQL_SAFE_UPDATES = 1;

SELECT username FROM user_account
WHERE username = 'Kodawg395';

ALTER TABLE user_account
MODIFY COLUMN Password CHAR(60) NOT NULL;

CREATE TABLE test (
	id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

SELECT * FROM test
WHERE id = 'john';