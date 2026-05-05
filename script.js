"use strict";


// - DOM ELEMENTS -
const musicPlayer = document.getElementById("musicPlayer");
const trackList = document.getElementById("tracklist");
const dummyOpenButton = document.getElementById("listIdOpenButton");
const theActualMusicPlayingElement = document.getElementById("theActualMusicPlayingElement");
let currentSong;

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


class Song {
    constructor(albumCover, link, title, game, songLengthSecs) {
        this.albumCover = "./covers/" + game.gameID + albumCover + ".jpeg";
        this.link = "./songs/" + game.gameID + "/" + link;
        this.title = title;
        this.game = game;
        this.songLengthSecs = songLengthSecs;
    }
    play() {
        changeMetadata();
        if (theActualMusicPlayingElement == this.link) {
            theActualMusicPlayingElement.play();
        }
        else {
            theActualMusicPlayingElement.src = this.link;
            theActualMusicPlayingElement.play();
        }
        
    }
    pause() {
        theActualMusicPlayingElement.pause();
    }
    stop () {
        theActualMusicPlayingElement.pause();
        theActualMusicPlayingElement.src = "";
        theActualMusicPlayingElement.currentTime = 0;
    }
}

let sf = new Game("sf", [], "Sonic Frontiers");


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
                currentSong = game.songs[i];
                changeMetadata();
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

function changeMetadata() {
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
        currentSong.stop();
        metadataContainer.parentElement.firstElementChild.firstElementChild.src = "./covers/noSong.png";
        metadataContainer.firstElementChild.textContent = "No song selected";
        metadataContainer.children[1].textContent = "No game selected";
    })
}



class UserPlaylist extends Playlist {
    constructor(title, listID) {
        super(title, listID);
        this.songs = [];
    }
    addSong(song) {
        this.songs.push(song);
    }
    shuffle() {
        super.shuffle();
    }
}


/* --- I hate to do this again, but... --- */
/* --- SONGS HELL!!! --- */
let sf0 = new Song("Yellow", "A Wonderful World (Celebration Mix).mp3", "A Wonderful World (Celebration Mix)", sf, 140);
sf.addSong(sf0);
let sf1 = new Song("Default", "A Wonderful World.mp3", "A Wonderful World", sf, 140);
sf.addSong(sf1);
let sf2 = new Song("Default", "Achievement (Jingle).mp3", "Achievement (Jingle)", sf, 140);
sf.addSong(sf2);
let sf3 = new Song("Yellow", "Action Chain Challenge.mp3", "Action Chain Challenge", sf, 140);
sf.addSong(sf3);
let sf4 = new Song("Yellow", "Another Passage (Tails Mvt.).mp3", "Another Passage (Tails Mvt.)", sf, 140);
sf.addSong(sf4);
let sf5 = new Song("Default", "Another Tomorrow.mp3", "Another Tomorrow", sf, 140);
sf.addSong(sf5);
let sf6 = new Song("Default", "Ares Island (1st Mvt.).mp3", "Ares Island (1st Mvt.)", sf, 140);
sf.addSong(sf6);
let sf7 = new Song("Default", "Ares Island (2nd Mvt.).mp3", "Ares Island (2nd Mvt.)", sf, 140);
sf.addSong(sf7);
let sf8 = new Song("Default", "Ares Island (3rd Mvt.).mp3", "Ares Island (3rd Mvt.)", sf, 140);
sf.addSong(sf8);
let sf9 = new Song("Default", "Ares Island (4th Mvt.).mp3", "Ares Island (4th Mvt.)", sf, 140);
sf.addSong(sf9);
let sf10 = new Song("Default", "Ares Island (5th Mvt.).mp3", "Ares Island (5th Mvt.)", sf, 140);
sf.addSong(sf10);
let sf11 = new Song("Default", "Ares Island (6th Mvt.).mp3", "Ares Island (6th Mvt.)", sf, 140);
sf.addSong(sf11);
let sf12 = new Song("Default", "Ares Island (7th Mvt.).mp3", "Ares Island (7th Mvt.)", sf, 140);
sf.addSong(sf12);
let sf13 = new Song("Default", "Arriving on Starfall Islands.mp3", "Arriving on Starfall Islands", sf, 140);
sf.addSong(sf13);
let sf14 = new Song("Default", "Ascent of Fallen Warriors.mp3", "Ascent of Fallen Warriors", sf, 140);
sf.addSong(sf14);
let sf15 = new Song("Default", "Awakening.mp3", "Awakening", sf, 140);
sf.addSong(sf15);
let sf16 = new Song("Default", "Beyond the Past.mp3", "Beyond the Past", sf, 140);
sf.addSong(sf16);
let sf17 = new Song("Yellow", "Blood Flow (Knuckles Mvt.).mp3", "Blood Flow (Knuckles Mvt.)", sf, 140);
sf.addSong(sf17);
let sf18 = new Song("Yellow", "Break Through It All (Instrumental).mp3", "Break Through It All (Instrumental)", sf, 140);
sf.addSong(sf18);
let sf19 = new Song("Default", "Break Through It All.mp3", "Break Through It All", sf, 140);
sf.addSong(sf19);
let sf20 = new Song("Default", "Builders of the Ancient Civilization.mp3", "Builders of the Ancient Civilization", sf, 140);
sf.addSong(sf20);
let sf21 = new Song("Default", "Chaos Emerald Vault (Jingle).mp3", "Chaos Emerald Vault (Jingle)", sf, 140);
sf.addSong(sf21);
let sf22 = new Song("Default", "Chaos Engine.mp3", "Chaos Engine", sf, 140);
sf.addSong(sf22);
let sf23 = new Song("Default", "Chaos Island (1st Mvt.).mp3", "Chaos Island (1st Mvt.)", sf, 140);
sf.addSong(sf23);
let sf24 = new Song("Default", "Chaos Island (2nd Mvt.).mp3", "Chaos Island (2nd Mvt.)", sf, 140);
sf.addSong(sf24);
let sf25 = new Song("Default", "Chaos Island (3rd Mvt.).mp3", "Chaos Island (3rd Mvt.)", sf, 140);
sf.addSong(sf25);
let sf26 = new Song("Default", "Chaos Island (4th Mvt.).mp3", "Chaos Island (4th Mvt.)", sf, 140);
sf.addSong(sf26);
let sf27 = new Song("Default", "Chaos Island (5th Mvt.).mp3", "Chaos Island (5th Mvt.)", sf, 140);
sf.addSong(sf27);
let sf28 = new Song("Default", "Chaos Island (6th Mvt.).mp3", "Chaos Island (6th Mvt.)", sf, 140);
sf.addSong(sf28);
let sf29 = new Song("Default", "Chaos Island (7th Mvt.).mp3", "Chaos Island (7th Mvt.)", sf, 140);
sf.addSong(sf29);
let sf30 = new Song("Default", "Create a Bridge (Jingle).mp3", "Create a Bridge (Jingle)", sf, 140);
sf.addSong(sf30);
let sf31 = new Song("Default", "Cyber Space 1-1： Database.mp3", "Cyber Space 1-1： Database", sf, 140);
sf.addSong(sf31);
let sf32 = new Song("Default", "Cyber Space 1-2： Flowing.mp3", "Cyber Space 1-2： Flowing", sf, 140);
sf.addSong(sf32);
let sf33 = new Song("Default", "Cyber Space 1-3： Digital Cave.mp3", "Cyber Space 1-3： Digital Cave", sf, 140);
sf.addSong(sf33);
let sf34 = new Song("Default", "Cyber Space 1-4： Genshi.mp3", "Cyber Space 1-4： Genshi", sf, 140);
sf.addSong(sf34);
let sf35 = new Song("Default", "Cyber Space 1-5： Dropaholic.mp3", "Cyber Space 1-5： Dropaholic", sf, 140);
sf.addSong(sf35);
let sf36 = new Song("Default", "Cyber Space 1-6： Go Back 2 Your Roots.mp3", "Cyber Space 1-6： Go Back 2 Your Roots", sf, 140);
sf.addSong(sf36);
let sf37 = new Song("Default", "Cyber Space 1-7： Time Flyer.mp3", "Cyber Space 1-7： Time Flyer", sf, 140);
sf.addSong(sf37);
let sf38 = new Song("Default", "Cyber Space 2-1： Slice & Sway.mp3", "Cyber Space 2-1： Slice & Sway", sf, 140);
sf.addSong(sf38);
let sf39 = new Song("Default", "Cyber Space 2-2： Heavenly Sky.mp3", "Cyber Space 2-2： Heavenly Sky", sf, 140);
sf.addSong(sf39);
let sf40 = new Song("Default", "Cyber Space 2-3： Nostalgic Sweep.mp3", "Cyber Space 2-3： Nostalgic Sweep", sf, 140);
sf.addSong(sf40);
let sf41 = new Song("Default", "Cyber Space 2-4： Hype Street.mp3", "Cyber Space 2-4： Hype Street", sf, 140);
sf.addSong(sf41);
let sf42 = new Song("Default", "Cyber Space 2-5： Déjà vu.mp3", "Cyber Space 2-5： Déjà vu", sf, 140);
sf.addSong(sf42);
let sf43 = new Song("Default", "Cyber Space 2-6： Transparent Highway.mp3", "Cyber Space 2-6： Transparent Highway", sf, 140);
sf.addSong(sf43);
let sf44 = new Song("Default", "Cyber Space 2-7： Floating in the Blue.mp3", "Cyber Space 2-7： Floating in the Blue", sf, 140);
sf.addSong(sf44);
let sf45 = new Song("Default", "Cyber Space 3-1： Escape the Loop.mp3", "Cyber Space 3-1： Escape the Loop", sf, 140);
sf.addSong(sf45);
let sf46 = new Song("Default", "Cyber Space 3-2： Go Slap.mp3", "Cyber Space 3-2： Go Slap", sf, 140);
sf.addSong(sf46);
let sf47 = new Song("Default", "Cyber Space 3-3： Memory Will Tell.mp3", "Cyber Space 3-3： Memory Will Tell", sf, 140);
sf.addSong(sf47);
let sf48 = new Song("Default", "Cyber Space 3-4： Constructure.mp3", "Cyber Space 3-4： Constructure", sf, 140);
sf.addSong(sf48);
let sf49 = new Song("Default", "Cyber Space 3-5： BMB.mp3", "Cyber Space 3-5： BMB", sf, 140);
sf.addSong(sf49);
let sf50 = new Song("Default", "Cyber Space 3-6： Enjoy this World.mp3", "Cyber Space 3-6： Enjoy this World", sf, 140);
sf.addSong(sf50);
let sf51 = new Song("Default", "Cyber Space 3-7： All Reality.mp3", "Cyber Space 3-7： All Reality", sf, 140);
sf.addSong(sf51);
let sf52 = new Song("Default", "Cyber Space 4-1： Exceed Mach.mp3", "Cyber Space 4-1： Exceed Mach", sf, 140);
sf.addSong(sf52);
let sf53 = new Song("Default", "Cyber Space 4-2： Ephemeral.mp3", "Cyber Space 4-2： Ephemeral", sf, 140);
sf.addSong(sf53);
let sf54 = new Song("Default", "Cyber Space 4-3： Rumble Rave.mp3", "Cyber Space 4-3： Rumble Rave", sf, 140);
sf.addSong(sf54);
let sf55 = new Song("Default", "Cyber Space 4-4： Wishes in the Wind.mp3", "Cyber Space 4-4： Wishes in the Wind", sf, 140);
sf.addSong(sf55);
let sf56 = new Song("Default", "Cyber Space 4-5： Arrow of Time.mp3", "Cyber Space 4-5： Arrow of Time", sf, 140);
sf.addSong(sf56);
let sf57 = new Song("Default", "Cyber Space 4-6： Fog Funk.mp3", "Cyber Space 4-6： Fog Funk", sf, 140);
sf.addSong(sf57);
let sf58 = new Song("Default", "Cyber Space 4-7： Rewind to Go Ahead.mp3", "Cyber Space 4-7： Rewind to Go Ahead", sf, 140);
sf.addSong(sf58);
let sf59 = new Song("Default", "Cyber Space 4-8： No Pain, No Gain.mp3", "Cyber Space 4-8： No Pain, No Gain", sf, 140);
sf.addSong(sf59);
let sf60 = new Song("Default", "Cyber Space 4-9： Signs.mp3", "Cyber Space 4-9： Signs", sf, 140);
sf.addSong(sf60);
let sf61 = new Song("Yellow", "Cyber Space 4-A： Genshi Remix.mp3", "Cyber Space 4-A： Genshi Remix", sf, 140);
sf.addSong(sf61);
let sf62 = new Song("Yellow", "Cyber Space 4-B： Escape the Loop Remix.mp3", "Cyber Space 4-B： Escape the Loop Remix", sf, 140);
sf.addSong(sf62);
let sf63 = new Song("Yellow", "Cyber Space 4-C： Arrow of Time Remix.mp3", "Cyber Space 4-C： Arrow of Time Remix", sf, 140);
sf.addSong(sf63);
let sf64 = new Song("Yellow", "Cyber Space 4-D： Rumble Rave Remix.mp3", "Cyber Space 4-D： Rumble Rave Remix", sf, 140);
sf.addSong(sf64);
let sf65 = new Song("Yellow", "Cyber Space 4-E： Dropaholic Remix.mp3", "Cyber Space 4-E： Dropaholic Remix", sf, 140);
sf.addSong(sf65);
let sf66 = new Song("Yellow", "Cyber Space 4-F： Hype Street Remix.mp3", "Cyber Space 4-F： Hype Street Remix", sf, 140);
sf.addSong(sf66);
let sf67 = new Song("Yellow", "Cyber Space 4-G： Ephemeral Remix.mp3", "Cyber Space 4-G： Ephemeral Remix", sf, 140);
sf.addSong(sf67);
let sf68 = new Song("Yellow", "Cyber Space 4-H： Wishes in the Wind Remix.mp3", "Cyber Space 4-H： Wishes in the Wind Remix", sf, 140);
sf.addSong(sf68);
let sf69 = new Song("Yellow", "Cyber Space 4-I： Time Flyer Remix.mp3", "Cyber Space 4-I： Time Flyer Remix", sf, 140);
sf.addSong(sf69);
let sf70 = new Song("Default", "Cyber Space： Result Screen (Complete).mp3", "Cyber Space： Result Screen (Complete)", sf, 140);
sf.addSong(sf70);
let sf71 = new Song("Default", "Cyber Space： Result Screen.mp3", "Cyber Space： Result Screen", sf, 140);
sf.addSong(sf71);
let sf72 = new Song("Yellow", "Dear Father (Instrumental).mp3", "Dear Father (Instrumental)", sf, 140);
sf.addSong(sf72);
let sf73 = new Song("Default", "Dear Father.mp3", "Dear Father", sf, 140);
sf.addSong(sf73);
let sf74 = new Song("Default", "Doomed.mp3", "Doomed", sf, 140);
sf.addSong(sf74);
let sf75 = new Song("Default", "Eggman's Notes.mp3", "Eggman's Notes", sf, 140);
sf.addSong(sf75);
let sf76 = new Song("Default", "Enemy： WOLF.mp3", "Enemy： WOLF", sf, 140);
sf.addSong(sf76);
let sf77 = new Song("Default", "EQ.mp3", "EQ", sf, 140);
sf.addSong(sf77);
let sf78 = new Song("Default", "Face Yourself.mp3", "Face Yourself", sf, 140);
sf.addSong(sf78);
let sf79 = new Song("Default", "Face-off.mp3", "Face-off", sf, 140);
sf.addSong(sf79);
let sf80 = new Song("Default", "Fake Moon.mp3", "Fake Moon", sf, 140);
sf.addSong(sf80);
let sf81 = new Song("Default", "Fallen Ancestrial Star.mp3", "Fallen Ancestrial Star", sf, 140);
sf.addSong(sf81);
let sf82 = new Song("Default", "Final Battle (Absolute).mp3", "Final Battle (Absolute)", sf, 140);
sf.addSong(sf82);
let sf83 = new Song("Yellow", "Find Your Flame (Instrumental).mp3", "Find Your Flame (Instrumental)", sf, 140);
sf.addSong(sf83);
let sf84 = new Song("Default", "Find Your Flame.mp3", "Find Your Flame", sf, 140);
sf.addSong(sf84);
let sf85 = new Song("Default", "Fishing Vibes.mp3", "Fishing Vibes", sf, 140);
sf.addSong(sf85);
let sf86 = new Song("Default", "Fist.mp3", "Fist", sf, 140);
sf.addSong(sf86);
let sf87 = new Song("Default", "For Whom.mp3", "For Whom", sf, 140);
sf.addSong(sf87);
let sf88 = new Song("Default", "Friends.mp3", "Friends", sf, 140);
sf.addSong(sf88);
let sf89 = new Song("Default", "Geared Up!.mp3", "Geared Up!", sf, 140);
sf.addSong(sf89);
let sf90 = new Song("Default", "Get Chaos Emeralds (Jingle).mp3", "Get Chaos Emeralds (Jingle)", sf, 140);
sf.addSong(sf90);
let sf91 = new Song("Default", "Get Vault Keys (Jingle).mp3", "Get Vault Keys (Jingle)", sf, 140);
sf.addSong(sf91);
let sf92 = new Song("Default", "Guardians： First Encounters.mp3", "Guardians： First Encounters", sf, 140);
sf.addSong(sf92);
let sf93 = new Song("Default", "Guardian： ASURA.mp3", "Guardian： ASURA", sf, 140);
sf.addSong(sf93);
let sf94 = new Song("Yellow", "Guardian： CATERPILLAR (Alternate Ver.).mp3", "Guardian： CATERPILLAR (Alternate Ver.)", sf, 140);
sf.addSong(sf94);
let sf95 = new Song("Default", "Guardian： CATERPILLAR.mp3", "Guardian： CATERPILLAR", sf, 140);
sf.addSong(sf95);
let sf96 = new Song("Default", "Guardian： FORTRESS.mp3", "Guardian： FORTRESS", sf, 140);
sf.addSong(sf96);
let sf97 = new Song("Yellow", "Guardian： GHOST (Alternate Ver.).mp3", "Guardian： GHOST (Alternate Ver.)", sf, 140);
sf.addSong(sf97);
let sf98 = new Song("Default", "Guardian： GHOST.mp3", "Guardian： GHOST", sf, 140);
sf.addSong(sf98);
let sf99 = new Song("Yellow", "Guardian： NINJA (Alternate Ver.).mp3", "Guardian： NINJA (Alternate Ver.)", sf, 140);
sf.addSong(sf99);
let sf100 = new Song("Default", "Guardian： NINJA.mp3", "Guardian： NINJA", sf, 140);
sf.addSong(sf100);
let sf101 = new Song("Default", "Guardian： SHARK.mp3", "Guardian： SHARK", sf, 140);
sf.addSong(sf101);
let sf102 = new Song("Yellow", "Guardian： SPIDER (Alternate Ver.).mp3", "Guardian： SPIDER (Alternate Ver.)", sf, 140);
sf.addSong(sf102);
let sf103 = new Song("Default", "Guardian： SPIDER.mp3", "Guardian： SPIDER", sf, 140);
sf.addSong(sf103);
let sf104 = new Song("Default", "Guardian： SQUID.mp3", "Guardian： SQUID", sf, 140);
sf.addSong(sf104);
let sf105 = new Song("Default", "Guardian： STRIDER.mp3", "Guardian： STRIDER", sf, 140);
sf.addSong(sf105);
let sf106 = new Song("Default", "Guardian： SUMO.mp3", "Guardian： SUMO", sf, 140);
sf.addSong(sf106);
let sf107 = new Song("Yellow", "Guardian： TANK (Alternate Ver.).mp3", "Guardian： TANK (Alternate Ver.)", sf, 140);
sf.addSong(sf107);
let sf108 = new Song("Default", "Guardian： TANK.mp3", "Guardian： TANK", sf, 140);
sf.addSong(sf108);
let sf109 = new Song("Yellow", "Guardian： TOWER (Alternate Ver.).mp3", "Guardian： TOWER (Alternate Ver.)", sf, 140);
sf.addSong(sf109);
let sf110 = new Song("Default", "Guardian： TOWER.mp3", "Guardian： TOWER", sf, 140);
sf.addSong(sf110);
let sf111 = new Song("Default", "Hacking Mission Clear (Jingle).mp3", "Hacking Mission Clear (Jingle)", sf, 140);
sf.addSong(sf111);
let sf112 = new Song("Default", "Hacking Mission Fail (Jingle).mp3", "Hacking Mission Fail (Jingle)", sf, 140);
sf.addSong(sf112);
let sf113 = new Song("Default", "Heart and Soul.mp3", "Heart and Soul", sf, 140);
sf.addSong(sf113);
let sf114 = new Song("Default", "Hidden Technology.mp3", "Hidden Technology", sf, 140);
sf.addSong(sf114);
let sf115 = new Song("Yellow", "I'm Here (Instrumental).mp3", "I'm Here (Instrumental)", sf, 140);
sf.addSong(sf115);
let sf116 = new Song("Yellow", "I'm Here (Orchestral Ver.).mp3", "I'm Here (Orchestral Ver.)", sf, 140);
sf.addSong(sf116);
let sf117 = new Song("Yellow", "I'm Here (Revisited).mp3", "I'm Here (Revisited)", sf, 140);
sf.addSong(sf117);
let sf118 = new Song("Default", "I'm Here.mp3", "I'm Here", sf, 140);
sf.addSong(sf118);
let sf119 = new Song("Yellow", "I'm With You (Vocal Ver.).mp3", "I'm With You (Vocal Ver.)", sf, 140);
sf.addSong(sf119);
let sf120 = new Song("Default", "I'm With You.mp3", "I'm With You", sf, 140);
sf.addSong(sf120);
let sf121 = new Song("Default", "Inextinguishable Doubt.mp3", "Inextinguishable Doubt", sf, 140);
sf.addSong(sf121);
let sf122 = new Song("Default", "Intangible Amy.mp3", "Intangible Amy", sf, 140);
sf.addSong(sf122);
let sf123 = new Song("Default", "Intangible Knuckles.mp3", "Intangible Knuckles", sf, 140);
sf.addSong(sf123);
let sf124 = new Song("Default", "Intangible Tails.mp3", "Intangible Tails", sf, 140);
sf.addSong(sf124);
let sf125 = new Song("Default", "Island Mystery： Hacking Mission.mp3", "Island Mystery： Hacking Mission", sf, 140);
sf.addSong(sf125);
let sf126 = new Song("Default", "Island Mystery： Pinball.mp3", "Island Mystery： Pinball", sf, 140);
sf.addSong(sf126);
let sf127 = new Song("Default", "Keep Your Head Up.mp3", "Keep Your Head Up", sf, 140);
sf.addSong(sf127);
let sf128 = new Song("Default", "Kronos Island (1st Mvt.).mp3", "Kronos Island (1st Mvt.)", sf, 140);
sf.addSong(sf128);
let sf129 = new Song("Default", "Kronos Island (2nd Mvt.).mp3", "Kronos Island (2nd Mvt.)", sf, 140);
sf.addSong(sf129);
let sf130 = new Song("Default", "Kronos Island (3rd Mvt.).mp3", "Kronos Island (3rd Mvt.)", sf, 140);
sf.addSong(sf130);
let sf131 = new Song("Default", "Kronos Island (4th Mvt.).mp3", "Kronos Island (4th Mvt.)", sf, 140);
sf.addSong(sf131);
let sf132 = new Song("Default", "Kronos Island (5th Mvt.).mp3", "Kronos Island (5th Mvt.)", sf, 140);
sf.addSong(sf132);
let sf133 = new Song("Default", "Kronos Island (6th Mvt.).mp3", "Kronos Island (6th Mvt.)", sf, 140);
sf.addSong(sf133);
let sf134 = new Song("Default", "Kronos Island (7th Mvt.).mp3", "Kronos Island (7th Mvt.)", sf, 140);
sf.addSong(sf134);
let sf135 = new Song("Default", "Land a Catch (Jingle).mp3", "Land a Catch (Jingle)", sf, 140);
sf.addSong(sf135);
let sf136 = new Song("Default", "Land a New Catch (Jingle).mp3", "Land a New Catch (Jingle)", sf, 140);
sf.addSong(sf136);
let sf137 = new Song("Default", "Last Ordeal.mp3", "Last Ordeal", sf, 140);
sf.addSong(sf137);
let sf138 = new Song("Default", "Lost Friend.mp3", "Lost Friend", sf, 140);
sf.addSong(sf138);
let sf139 = new Song("Yellow", "Master Koco Trial.mp3", "Master Koco Trial", sf, 140);
sf.addSong(sf139);
let sf140 = new Song("Yellow", "Maybe If (Amy Mvt.).mp3", "Maybe If (Amy Mvt.)", sf, 140);
sf.addSong(sf140);
let sf141 = new Song("Default", "Mystery Girl.mp3", "Mystery Girl", sf, 140);
sf.addSong(sf141);
let sf142 = new Song("Default", "Mystery Solved (Jingle).mp3", "Mystery Solved (Jingle)", sf, 140);
sf.addSong(sf142);
let sf143 = new Song("Default", "No Way Out.mp3", "No Way Out", sf, 140);
sf.addSong(sf143);
let sf144 = new Song("Default", "One Last Wish.mp3", "One Last Wish", sf, 140);
sf.addSong(sf144);
let sf145 = new Song("Yellow", "One Way Dream (Instrumental).mp3", "One Way Dream (Instrumental)", sf, 140);
sf.addSong(sf145);
let sf146 = new Song("Default", "One Way Dream.mp3", "One Way Dream", sf, 140);
sf.addSong(sf146);
let sf147 = new Song("Yellow", "Ouranos Island (Remix).mp3", "Ouranos Island (Remix)", sf, 140);
sf.addSong(sf147);
let sf148 = new Song("Default", "Ouranos Island.mp3", "Ouranos Island", sf, 140);
sf.addSong(sf148);
let sf149 = new Song("Default", "Premonition.mp3", "Premonition", sf, 140);
sf.addSong(sf149);
let sf150 = new Song("Default", "Purification of Souls.mp3", "Purification of Souls", sf, 140);
sf.addSong(sf150);
let sf151 = new Song("Default", "Quest Result (Jingle).mp3", "Quest Result (Jingle)", sf, 140);
sf.addSong(sf151);
let sf152 = new Song("Default", "Quest： Bridge the Gap.mp3", "Quest： Bridge the Gap", sf, 140);
sf.addSong(sf152);
let sf153 = new Song("Default", "Quest： SOS Backup.mp3", "Quest： SOS Backup", sf, 140);
sf.addSong(sf153);
let sf154 = new Song("Default", "Quest： The Best Defense.mp3", "Quest： The Best Defense", sf, 140);
sf.addSong(sf154);
let sf155 = new Song("Default", "Rejection.mp3", "Rejection", sf, 140);
sf.addSong(sf155);
let sf156 = new Song("Default", "Resolution of Sage.mp3", "Resolution of Sage", sf, 140);
sf.addSong(sf156);
let sf157 = new Song("Default", "Rhea Island.mp3", "Rhea Island", sf, 140);
sf.addSong(sf157);
let sf158 = new Song("Default", "Sealing.mp3", "Sealing", sf, 140);
sf.addSong(sf158);
let sf159 = new Song("Yellow", "Second Wind (Sonic Mvt.).mp3", "Second Wind (Sonic Mvt.)", sf, 140);
sf.addSong(sf159);
let sf160 = new Song("Default", "Sonic on the Move.mp3", "Sonic on the Move", sf, 140);
sf.addSong(sf160);
let sf161 = new Song("Default", "Star Crossed.mp3", "Star Crossed", sf, 140);
sf.addSong(sf161);
let sf162 = new Song("Default", "Super Sonic Fallen.mp3", "Super Sonic Fallen", sf, 140);
sf.addSong(sf162);
let sf163 = new Song("Default", "The Beginning of the End.mp3", "The Beginning of the End", sf, 140);
sf.addSong(sf163);
let sf164 = new Song("Default", "The Last Piece.mp3", "The Last Piece", sf, 140);
sf.addSong(sf164);
let sf165 = new Song("Default", "The Losing Soul.mp3", "The Losing Soul", sf, 140);
sf.addSong(sf165);
let sf166 = new Song("Default", "The Six Wedges.mp3", "The Six Wedges", sf, 140);
sf.addSong(sf166);
let sf167 = new Song("Default", "The Time Has Come.mp3", "The Time Has Come", sf, 140);
sf.addSong(sf167);
let sf168 = new Song("Default", "The Vision.mp3", "The Vision", sf, 140);
sf.addSong(sf168);
let sf169 = new Song("Default", "The Will of the Emeralds.mp3", "The Will of the Emeralds", sf, 140);
sf.addSong(sf169);
let sf170 = new Song("Default", "Theme of Koco.mp3", "Theme of Koco", sf, 140);
sf.addSong(sf170);
let sf171 = new Song("Default", "Theme of Starfall Islands.mp3", "Theme of Starfall Islands", sf, 140);
sf.addSong(sf171);
let sf172 = new Song("Default", "Time to Unite.mp3", "Time to Unite", sf, 140);
sf.addSong(sf172);
let sf173 = new Song("Default", "Titan Finale.mp3", "Titan Finale", sf, 140);
sf.addSong(sf173);
let sf174 = new Song("Default", "Titan Puppeteer.mp3", "Titan Puppeteer", sf, 140);
sf.addSong(sf174);
let sf175 = new Song("Default", "Titan： GIGANTO.mp3", "Titan： GIGANTO", sf, 140);
sf.addSong(sf175);
let sf176 = new Song("Default", "Titan： KNIGHT.mp3", "Titan： KNIGHT", sf, 140);
sf.addSong(sf176);
let sf177 = new Song("Default", "Titan： SUPREME.mp3", "Titan： SUPREME", sf, 140);
sf.addSong(sf177);
let sf178 = new Song("Default", "Titan： WYVERN.mp3", "Titan： WYVERN", sf, 140);
sf.addSong(sf178);
let sf179 = new Song("Default", "To Another Frontier.mp3", "To Another Frontier", sf, 140);
sf.addSong(sf179);
let sf180 = new Song("Default", "To The New Frontier.mp3", "To The New Frontier", sf, 140);
sf.addSong(sf180);
let sf181 = new Song("Default", "Trapped.mp3", "Trapped", sf, 140);
sf.addSong(sf181);
let sf182 = new Song("Yellow", "Undefeatable (Instrumental).mp3", "Undefeatable (Instrumental)", sf, 140);
sf.addSong(sf182);
let sf183 = new Song("Default", "Undefeatable.mp3", "Undefeatable", sf, 140);
sf.addSong(sf183);
let sf184 = new Song("Default", "Unforseen.mp3", "Unforseen", sf, 140);
sf.addSong(sf184);
let sf185 = new Song("Default", "Unheard.mp3", "Unheard", sf, 140);
sf.addSong(sf185);
let sf186 = new Song("Default", "Visions of Home.mp3", "Visions of Home", sf, 140);
sf.addSong(sf186);

let sonicFrontiersPlaylist = new Playlist("Sonic Frontiers", "sf", sf);
sonicFrontiersPlaylist.addSongsFromGameId(sf);