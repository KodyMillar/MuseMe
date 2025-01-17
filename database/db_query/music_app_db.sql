CREATE DATABASE music_app;
USE music_app;
CREATE USER 'museme'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'ROMRAMRemRam!';
GRANT ALL PRIVILEGES ON music_app.* TO 'museme'@'%';

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

ALTER TABLE instrument_players
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

ALTER TABLE user_account
MODIFY COLUMN Password CHAR(60) NOT NULL;

-- SELECT Username, Book_Name, mb.Book_ID, s.Song_ID, Song_Name, s.Difficulty, s.Image_Link, pages FROM music_book AS mb 
-- INNER JOIN book_song AS bs ON mb.Book_ID = bs.Book_ID 
-- INNER JOIN song AS s ON bs.Song_ID = s.Song_ID
-- INNER JOIN purchase AS p ON p.Book_ID = mb.Book_ID
-- INNER JOIN user_account AS ua ON ua.User_ID = p.User_ID
-- INNER JOIN song_progress AS sp ON sp.User_ID = p.User_ID 
-- AND sp.Book_ID = p.Book_ID
-- AND sp.Song_ID = s.Song_ID
-- WHERE Username = 'Kodawg395';

DESCRIBE song_progress;
    
SET SQL_SAFE_UPDATES = 0;
DELETE FROM song_progress;
SET SQL_SAFE_UPDATES = 1;

DELETE FROM purchase
WHERE Book_ID = 1;

DELETE FROM purchase
WHERE Book_ID = 2;

ALTER TABLE purchase
DROP CONSTRAINT purchase_ibfk_1;

ALTER TABLE purchase
DROP CONSTRAINT purchase_user_fk;

ALTER TABLE purchase
DROP PRIMARY KEY;

ALTER TABLE purchase
ADD PRIMARY KEY (Book_ID, User_ID); 

ALTER TABLE purchase
ADD CONSTRAINT purchase_ibfk_1 FOREIGN KEY (Book_ID) REFERENCES music_book(Book_ID);

ALTER TABLE purchase
ADD CONSTRAINT purchase_user_fk FOREIGN KEY (User_ID) REFERENCES user_account(User_ID);

ALTER TABLE music_book
ADD COLUMN Book_Price DECIMAL (4,2) NOT NULL;

ALTER TABLE music_book
ADD COLUMN Book_Description VARCHAR(1200) NOT NULL;

ALTER TABLE music_book
ADD COLUMN Shipping BIT NOT NULL;

ALTER TABLE music_book
ADD COLUMN Book_Artist VARCHAR(30) NOT NULL;

UPDATE music_book
SET Book_Artist = 'Frederic Chopin',
Book_Description = CONCAT_WS('\n', 'This book has all the must-play songs and much more from the legendary Frederic Chopin. Chopin is known for his sophisticated piano solos and waltzes. This book is a must buy for chopin enthusiasts and a great book for passionate piano players wishing to master highly influential songs.', 
                'Chopin began playing the piano when he was 4 years old, started composing music when he was 7 years old, and gave private piano concerts when he was only 8 years old.',
				'This book starts off with a well known piece that isn''t too hard or too easy: Waltz No.7 in C# Minor. This piece will kick you off with a thought provoking melody and will prepare you for Chopin''s more sophisticated pieces like Waltz in D-flat Major and Fantaisie Impromptu in C Minor. The book also includes what is probably his most famous piece: Nocturne Op 9 No 2 E Flat Major. No matter what song you choose, there will always be a new technique and variation to learn from Chopin''s music.'),
                Book_Price = 49.99,
                Shipping = 1
                WHERE Book_ID = 1;

UPDATE music_book
SET Shipping = 1
WHERE Book_ID = 1;

UPDATE music_book
SET Book_Price = '20.95'
WHERE Book_ID = 2;

UPDATE song_progress
SET progress = "Not Started"
WHERE Book_ID = 1 AND Song_ID = 1;

UPDATE song_progress
SET progress = "Not Started"
WHERE Book_ID = 1 AND Song_ID = 2;

SELECT * FROM user_account;

ALTER TABLE music_book
ADD COLUMN Num_Songs INT DEFAULT 0;

DELIMITER $$
CREATE TRIGGER after_song_insert
	AFTER INSERT ON book_song
    FOR EACH ROW
BEGIN
	UPDATE music_book
    SET Num_Songs = Num_Songs + 1
    WHERE Book_ID = NEW.Book_ID;
END$$
DELIMITER ; 

UPDATE music_book
SET Num_Songs = 8
WHERE Book_ID = 1;

 INSERT INTO instrument (Instrument) VALUES
 	('Piano'),
     ('Guitar'),
    ('Drums'),
    ('Violin'),
    ('Saxophone'),
    ('Cello');
    
ALTER TABLE instrument_players
ADD COLUMN Level_ID INT NOT NULL;

CREATE TABLE instrument_level (
	Level_ID INT NOT NULL AUTO_INCREMENT,
    Level VARCHAR(20) NOT NULL,
    Song_Count INT NOT NULL,
    Scale_Count INT NULL,
    Chord_Count INT NULL,
    Arpeggio INT NULL,
    PRIMARY KEY (Level_ID)
);

ALTER TABLE instrument_players
ADD CONSTRAINT inst_pl_level_fk FOREIGN KEY (Level_ID) REFERENCES instrument_level (Level_ID);

ALTER TABLE instrument_level
ADD COLUMN Instrument_ID INT NOT NULL;

ALTER TABLE instrument_level
ADD CONSTRAINT instrument_id_fk FOREIGN KEY (Instrument_ID) REFERENCES instrument (Instrument_ID);

ALTER TABLE song
ADD COLUMN Song_Type ENUM('Song', 'Major Scale', 'Natural Minor Scale', 'Harmonic Minor Scale', 'Melodic Minor Scale', 'Major Chord', 'Minor Chord', 'Sixth Chord', 'Seventh Chord', 'Diminished Chord', 'Triad Chord', 'Arpeggio') NOT NULL;

SET SQL_SAFE_UPDATES = 0;

UPDATE song
SET Song_Type = 'Song';

SET SQL_SAFE_UPDATES = 1;

ALTER TABLE song_progress
ADD INDEX book_by_user (User_ID ASC, Book_ID ASC) VISIBLE;

ALTER TABLE purchase 
ADD INDEX purchase_user (User_ID ASC) VISIBLE;

-- INSERT INTO instrument_level VALUES 
-- 	(1, 'Grade 1', 4, 
--     (1, 'Grade 2', 5
--     (1, 'Grade 3', 6
--     (1, 'Grade 4', 6
--     (1, 'Grade 5', 6
--     (1, 'Grade 6', 7
--     (1, 'Grade 7', 8
--     (1, 'Grade 8', 8
--     (1, 'Grade 9', 10
--     (1, 'Grade 10', 12

-- INSERT INTO instrument_players VALUES
-- 	(1, '8153d61f-06f9-4228-b059-3a619f49801c', 1);

