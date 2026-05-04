"use strict";

// - DOM ELEMENTS -
const musicPlayer = document.getElementById("musicPlayer");
const trackList = document.getElementById("tracklist");
const dummyOpenButton = document.getElementById("listIdOpenButton");



class Game {
    constructor(gameID, songs, gameTitle) {
        this.gameID = gameID;
        this.songs = songs;
        this.gameTitle = gameTitle
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

let sf = new Game("sf", [], "Sonic Frontiers");

class Song {
    constructor(albumCover, link, title, game, songLengthSecs) {
        this.albumCover = "./covers/" + game.gameID + albumCover + ".jpeg";
        this.link = "./songs/" + game.gameID + "/" + link;
        this.title = title;
        this.game = game;
        this.songLengthSecs = songLengthSecs;
        this._audio = new Audio(this.link);
    }
    play() {
        this._audio.play();
    }
    pause() {
        this._audio.pause();
    }
    stop() {
        // ADD CODE FOR PAUSING -> SETTING SONG TO NULL OR BLANK OR DEFAULT OR WHATEVER
    }
}

let sf1 = new Song("Default", "Chaos Island (6th Mvt.).mp3", "Chaos Island (6th Mvt.)", sf, 290);
sf.addSong(sf1);

class Playlist {
    constructor(title, listID, game) {
        this.title = title;
        this.listID = listID;
        this.songs = game.songs;
    }
    addSongsFromGameId(game) {
        // DOMfoolery pt0: cleaning out the dummy data
        const dummyListCategory = document.getElementById("dummyListCategory");
        dummyListCategory.remove();

        // DOMfoolery pt1: creating the actual list
        let listCategory = document.createElement("div");
        listCategory.classList.add("listCategory");

        // DOMfoolery pt2: making the button + event listener to open the list
        let openListButton = document.createElement("button");
        openListButton.id = this.listID + "OpenButton";
        openListButton.classList.add("openListButton");
        openListButton.textContent = this.title;
        openListButton.addEventListener("click", () => {
            if (document.getElementById(this.title).classList.contains("listTracks")) {
                document.getElementById(this.title).classList.replace("listTracks", "listTracksOpen");
            }
            else {
                document.getElementById(this.title).classList.replace("listTracksOpen", "listTracks");
            }
        });

        // DOMfoolery pt3: adding every song from songsList to the track
        let DOM_listTracks = document.createElement("ul");
        DOM_listTracks.classList.add("listTracks");
        DOM_listTracks.id = this.title;
        for (let i = 0; i < game.songs.length; i++) {
            let track = document.createElement("li");
            track.classList.add("track");
            track.textContent = game.songs[i].title;
            track.id = game.gameID + i;
            // DOMfoolery pt3.5: adding the event listener to each song to switch out the metadata (will call separate function)
            track.addEventListener("click", () => {
                let currentSong = game.songs[i];
                changeMetadata(currentSong);
            });

            DOM_listTracks.appendChild(track);
        }
        
        //DOMfoolery pt4: adding it all to the DOM (the part where it all goes to shit)
        /* 
        <div trackList>
            <div listCategory>
                <button> </>
                <listTracks>
                    <li track> track 1 </>
                    <li track> track 2> </>
                    and so on...
                </>
            </>
        </>
        */
       trackList.appendChild(listCategory);
       listCategory.appendChild(openListButton);
       listCategory.appendChild(DOM_listTracks);
        
    }
}

function changeMetadata(currentSong) {
    // step 1: changing the song title and game title
    let metadataContainer = document.getElementById("player").lastElementChild;
    metadataContainer.firstElementChild.textContent = currentSong.title; // <p id="title"> </p>
    metadataContainer.children[1].textContent = currentSong.game.gameTitle; // <p id="gameName"> </p>

    // step 2: changing the album cover
    metadataContainer.parentElement.firstElementChild.firstElementChild.src = currentSong.albumCover;

    // step 3: adding all the event listeners
    let playButton = document.getElementById("play");
    playButton.addEventListener("click", () => {
        currentSong.play();
    });
    let pauseButton = document.getElementById("pause");
    pauseButton.addEventListener("click", () => {
        currentSong.pause();
    });
       // stop button kinda has no reason to exist but its kinda neat i'll let it live -S
    let stopButton = document.getElementById("stop");
    stopButton.addEventListener("click", () => {
        currentSong.pause();
        metadataContainer.parentElement.firstElementChild.firstElementChild.src = "./covers/noSong.png";
        metadataContainer.firstElementChild.textContent = "No song playing";
        metadataContainer.children[1].textContent = "No game selected";
    })
}

let sonicFrontiersPlaylist = new Playlist("Sonic Frontiers", "sf", sf);
sonicFrontiersPlaylist.addSongsFromGameId(sf);

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
