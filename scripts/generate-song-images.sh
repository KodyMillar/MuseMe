#!/bin/bash
#
# DESCRIPTION: This script takes a pdf of a music piece and converts it into multiple jpegs for each page.
# This is so that the song can be displayed on the app.
# It has a recursive option, where the shell will go through all the folders in the current directory and
# convert the pdfs in all of the directories into jpeg images. The pdf will be deleted afterwards.

usage () {
	echo "gsi - Convert music sheet pdf to jpeg images of each page and generate SQL query for each song."
	echo "Ensure the proper folder structure is set up beforehand. There should be a pdf of the song in a folder."
	echo -e "For recursion, run the command outside of the subdirectories with the song pdf(s).\n"
	echo "gsi [-r] [-d] [-v] [-b [BOOK_ID]] pdf"
	echo "[-r] recurse through all directories. Make sure you are in the parent directory of the songs."
	echo "[-d] delete the pdf afterwards."
	echo "[-v] verbose, display current directory and images generated from the pdf."
	echo "[-b] generate associate table values based on Book_ID provided."
	echo "     Ensure all songs in the subdirectories are for the same BOOK_ID!"
	exit 0
}

while getopts ":rdvb:" OPT; do
    case ${OPT} in
	r)
	    RECURSIVE=true
	    ;;
	d)
	    DELETE=true
	    ;;
	b)
	    BOOK_ID=${OPTARG}
	    ;;
	v)
	    VERBOSE=true
	    ;;
	?)
	    usage
	    ;;
	*)
	    usage
	    ;;
    esac
done

if [ $1 = "--help" ]; then
	usage
fi

SQL_QUERY="INSERT INTO song (Song_Name, Difficulty, Image_Link, pages) VALUES\n"

add_to_query () {

	Song_Name="$(basename $(pwd) | tr '_' ' ')"
	if [ $VERBOSE ]
	then
	    echo -e "\nSong name: $Song_Name"
	fi

	Image_Link="$(basename $(dirname $(pwd)))/"
	Image_Link+="$(basename $(pwd))"
	if [ $VERBOSE ]
	then
	    echo "Image link: $Image_Link"
	fi

	pages=$(find . -type f -name "*.jpg" | wc -l)
	if [ $VERBOSE ]
	then
	    echo "Number of pages: $pages"
	fi

	Correct_Difficulty='n'

	until [ $Correct_Difficulty = 'y' ]
	do
		read -p "Enter a difficulty for $Song_Name: " Difficulty
		read -p "Is '$Difficulty' the difficulty you want? (y for yes, any other key for no)" Correct_Difficulty
	done

	ROW_TO_INSERT="    ('$Song_Name', '$Difficulty', '$Image_Link', '$pages')"

	SQL_QUERY+="$ROW_TO_INSERT\n"
}

convert () {
	pdf=$(find . -type f -name "*.pdf" -printf "%f\n")

	if [[ $pdf && ! $(find . -type f -name "*.jpg") ]]; then

	    if [ $VERBOSE ]
	    then
	       echo "converting $pdf..."
	    fi

            sudo pdftoppm -jpeg $pdf page || echo "No pdf found in '$(pwd)'"

	    sudo find . -maxdepth 1 -type f -name "page*.jpg" -printf "%f\n" -exec bash -c 'mv "$0" "${0//-/}"' {} \; > /dev/null

	    if [ $VERBOSE ]
	    then
		sudo find . -type f -name "page[0-9]*.jpg"  -printf "%f\n"
	    fi

	    if [ $DELETE ]
	    then
		sudo rm $pdf
	    fi

	    add_to_query
        else
	    if [ $VERBOSE ]
	    then
		if [ $pdf ]
		then
		    echo "pdf $pdf already converted"
		else
		    echo "No pdf found in $(pwd)"
		fi
		echo -e "exiting $(pwd)\n"
	    fi
	fi
}

if [ $RECURSIVE ]
then
	if ! [[ $(ls -d */ 2> /dev/null) ]]
	then
		echo "error: No subdirectories to recurse through"
		echo "use --help for more info"
		exit 1
	elif ! [[ $(ls * | grep .pdf) ]]
	then
		echo "error: no pdf in subdirectories"
		echo "use --help for more info"
		exit 1
	fi

	for song in $(ls -d */)
	do
		cd $song
		if [ $VERBOSE ]
		then
		    echo -e "\nentering $song"
		fi
		convert
		cd ../
	done
else
	convert
fi

if [ $BOOK_ID ]
then
	ASSOCIATIVE_QUERY="INSERT INTO book_song VALUES\n"
	next_id=$(($(mysql --defaults-file=/etc/mysql/my.cnf -u root music_app \
	-e "SELECT Song_ID FROM song ORDER BY Song_ID DESC LIMIT 1" | grep [0-9]) + 1))

	num_songs=$(( $(echo -e $SQL_QUERY | wc -l) - 2 ))

	last_id=$(($next_id + $num_songs - 1))

	for ((id=$next_id; id <= $last_id; id++))
	do
		ASSOCIATIVE_QUERY+="    ($BOOK_ID, $id)\n"
	done
fi

echo -e "\nSQL Query to insert the new songs"
echo "---------------------------------"
if [ $(echo -e $SQL_QUERY | wc -l) -gt 2 ]
then
	echo -e $SQL_QUERY
else
	echo "No new songs to put in Song table"
	echo -e "No pdfs were converted\n"
fi

if [ $BOOK_ID ]
then
	echo "SQL Query to insert into the associative table"
	echo "----------------------------------------------"
	if [ $(echo -e $ASSOCIATIVE_QUERY | wc -l) -gt 2 ]
	then
		echo -e $ASSOCIATIVE_QUERY
	else
		echo -e "No new songs to put in Book_Song table\n"
	fi
fi

echo -e "\n"

if [ $(echo -e $SQL_QUERY | wc -l) -gt 2 ]
then
	read -p "Insert SQL Query into music_app_db.sql script? (y/n)" insert
	if [ $insert = 'y' ]
	then
		folder_name=$(basename $(pwd))
		until [ $(basename $(pwd)) = "MuseMe" ]
		do
			cd ../
		done
		path_to_db="$(pwd)/db_query/music_app_db.sql"
		echo -e "\n-- New query for '$folder_name' folder" >> "$path_to_db"
		echo -e "$SQL_QUERY" >> "$path_to_db"

		if [ $(echo -e $ASSOCIATIVE_QUERY | wc -l) -gt 2 ]
		then
			echo -e "$ASSOCIATIVE_QUERY" >> "$path_to_db"
		fi
	fi
fi

exit 0
