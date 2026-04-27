class Song {
    constructor(albumCover, link, title, gameID, songLengthSecs) {
        this.albumCover = "./covers/" + gameID + albumCover;
        this.link = "./songs/" + gameID + link;
        this.title = title;
        this.gameID = gameID;
        this.songLengthSecs = songLengthSecs;

    }
    play() {
        // ADD CODE FOR PLAYING SONG
    }
    pause() {
        // ADD CODE FOR PAUSING SONG
    }
    stop() {
        // ADD CODE FOR PAUSING -> SETTING SONG TO NULL OR BLANK OR DEFAULT OR WHATEVER
    }
}