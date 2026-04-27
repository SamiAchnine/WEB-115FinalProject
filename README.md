# WEB-115FinalProject

**Proposal / Planning document** for final project <br>
Student: Sami Achnine | Repo: `WEB-115FinalProject`

## Music Player (Overview)!

Taking advantage of my many years long expedition to collect a bunch of video game music, I seek to put it all in one online collection/place where you can listen to it, add it to a collection, etc.<br>
The target audience is people who are fans of VGM (video game music) who are sick of the ads and paywalls of services like Youtube Music, Spotify, and Nintendo Music.<br>

## Features
 - Have a list of many video game songs, organized by game, with nice looking album art (Nintendo Music-esque) 
 - The ability to shuffle individual games/lists
 - The ability to create custom lists of liked songs
 - The liked music list is saved to localStorage for future reference
 - You can also export playlists in json format for loading in other browsers (stretch goal)

## Requirements coverage
| Req | Implementation |
|---|---|
|**If Statements & Loops**| In order to loop a song, or to shuffle a playlist, some if logic is required. For example, the song's `play()` function has an if check which checks if the shuffle is enabled, and replays the song as it ends with a while loop. Shuffle is similar, where the play method checks whether the shuffle is true, and picks a random song index from the playlist to play next. There is also edge case checks, where, for instance, the shuffle algorithm cannot pick songs which have already been played in this session.|
|**Event Listeners**| Pretty much everything has a click event attached to it, to set whether you've liked a song, whether to start playing the music or not, etc. |
|**DOM and Element Creation**| While the skeleton of the music player can be seen, the actual content is inserted at run-time through DOM manipulation. Only the very basics are in the raw HTML file. |
|**Classes & Subclasses**| The entire song infrastructure is done with classes, with the Song base class. This class contains the basics of what a song contains, such as the album art, and the reference to the song itself. Its methods are `play()`, `pause()`, and `stop()`. Playlists are also, shockingly, objects, with the `shuffle()` method. This allows for easy integration with custom playlists, which are children objects of Playlists that allow for user modification.|

## DLC
*JSON & localStorage:*
 - Custom playlists can be exported and imported to both localStorage and the user's hard drive using JSON.stringify() on export and JSON.parse() on load. This means that people will never lose their custom playlists.

*Fetch & APIs:*
 - I want to put my music on a different server which can be communicated with through this app, since hosting 20+GB of music files & album art on one GitHub repository is something Microsoft probably won't be very happy about (or even allow!).

## Tech stack
HTML, CSS, JavaScript<br>
localStorage<br>
Some kind of way to communicate between a file server which hosts my music files and the repository<br>
VSCode<br>
GitHub (if it decides to cooperate)<br>

## Day-by-day Plan
|Day|Plan A|Plan B|
|---|---|---|
|1|Write this very document!|No Plan B, already done|
|2|Create the infrastructure to play music with some local demo tracks, identify ways to get songs from my foreign server|None|
|3|Create ability to make a playlist of songs| Finish up song infrastructure and start work on playlists|
|4|Custom playlists|Regular playlists + custom playlists.|
|5|Start work on the server grabby thingy on the client end|Finish up on the music playing infrastructure, start finding ways to get the foreign server set up|
|6|Server-side infrastructure for obtaining songs (will probably be python based, might have to port forward something at home, will probably be in a separate repo which I might or might not have to commit to outside school hours, i'm not sure.)|Start work on the client side, if I can't make my python server at home, make it self-local hosted like in Python II class.|
|7|Finish any outstanding work regarding the client or server|Same as plan A|
|8|Expand the entire infrastructure to have all 20+gb of songs + Fix bugs which *will* result from that expansion|Finish outstanding client-server infrastructure problems|
|9|Fix the rest of the bugs relating to client-server infrastructure, then make the site look pretty|Same as Plan A for day 7|

I will almost certainly be revising this sprint plan, and will almost certainly be asking for help from other people to actually be able to finish this on time, mostly on understanding how various things work, such as understanding localStorage, and re-learning how Python-based servers for JS sites work. If, for whatever reason, I cannot implement the server infrastructure on time, I will resort to only adding a smaller amount of the songs which I had been planned on adding, or severely compressing the songs to get under GitHub's 5GB limit.