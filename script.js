// - DOM ELEMENTS -
const musicPlayer = document.getElementById("musicPlayer");
const trackList = document.getElementById("tracklist");



class Game {
    constructor(gameID, songs) {
        this.gameID = gameID;
        this.songs = songs;
    }
    addSong(song) {
        this.songs.push(song);
    }
    delSong(song) {
        for (let i = 0; i < this.songs.length; i++) {
            if (i == song) {
                this.songs.splice(i, 1)
            }
        }
    }
}

class Song {
    constructor(albumCover, link, title, game, songLengthSecs) {
        this.albumCover = "./covers/" + game.gameID + albumCover;
        this.link = "./songs/" + game.gameID + link;
        this.title = title;
        this.game = game;
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
        this.songs = this.addSongsFromGameId();
    }
    addSongsFromGameId(song) {
        let game = song.game;
        let songsList = [];
        for (let i = 0; i < game.songs; i++) {
            songsList.push(game.songs[i]);
        }
        return songsList;
        
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
