class Game {
    constructor(gameID) {
        this.gameID = gameID;
        this.songs = [];
    }
    addSong(self) {
        
    }
}

class Song extends Game {
    constructor(albumCover, link, title, game, songLengthSecs) {
        this.albumCover = "./covers/" + game.gameID + albumCover;
        this.link = "./songs/" + game.gameID + link;
        this.title = title;
        this.game = super(game, []);
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

class Playlist {
    constructor(albumCover, title, listID) {
        this.albumCover = "./covers/" + listID + albumCover;
        this.title = title;
        this.listID = listID;
        this.songs = this.getSongsFromGameId();
    }
    getSongsFromGameId(song) {
        let gameID = song.gameID;
        // for every song with that gameID, add it to the playlist
        // ...but when are they declared?
    }
    shuffle() {
        // ADD CODE FOR SHUFFLING ALL SONGS WITHIN this.songs
    }
}

class UserPlaylist extends Playlist {
    constructor(albumCover, title, listID) {
        super(albumCover, title, listID);
        this.songs = [];
    }
    addSong(song) {
        this.songs.push(song);
    }
    shuffle() {
        super.shuffle();
    }
}