USE music_app;

-- music_book table stores all the music books for sale
CREATE TABLE `music_app`.`music_book` (
  `Book_ID` INT NOT NULL AUTO_INCREMENT,
  `Book_Name` VARCHAR(100) NOT NULL,
  `Instrument` VARCHAR(100) NOT NULL,
  `Difficulty` VARCHAR(45) NOT NULL,
  `Image_Link` VARCHAR(100) NOT NULL,
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
ADD image_link varchar(100);

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


