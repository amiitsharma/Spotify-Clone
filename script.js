let audioArray = [];
const removeAllChildren = function (element) {
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
}
let cards = document.querySelectorAll(".playlists>.card");
cards.forEach(card => {
    card.addEventListener("click", async (e) => {
        let songSection = document.querySelector(".songs-sec");
        let imageWrapper = card.querySelector(".cover-pic");
        let computedStyle = window.getComputedStyle(imageWrapper);
        let image = computedStyle.getPropertyValue("background-image");
        console.log(imageWrapper);

        console.log("1" + image);
        let playListName = card.querySelector(".desc div:nth-child(1)").innerHTML;
        let playListDesc = card.querySelector(".desc div:nth-child(2)").innerHTML;
        removeAllChildren(songSection);
        console.log("2" + playListName);
        console.log("3" + playListDesc);
        let selectedPlayListCover = `<div class="content-wrapper-after-playlist-choosen">
        <div>
        <div>
            <div>
    
            </div>
            <div>
                <div>Playlist</div>
                <div><h1>${playListName}</h1></div>
                <div>${playListDesc}</div>
            </div>
        </div>
            <div class="play-options">
                <div>
                <div></div>
                <div></div>
                <div></div>
                </div>
                <div>
                <div>List</div>
                <div></div>
                <div>
            </div>
        </div>
    </div>`;

        songSection.innerHTML = selectedPlayListCover;
        songSection.style.backgroundColor = "#1DB954";
        songSection.querySelector(".play-options>div:nth-child(1)>div:nth-child(1)").style.backgroundImage = "url('./Assets/play-circle-svg-copy.svg')";
        songSection.querySelector(".play-options>div:nth-child(1)>div:nth-child(1)").style.backgroundSize = "cover";
        songSection.querySelector(".play-options>div:nth-child(1)>div:nth-child(2)").style.backgroundImage = "url('./Assets/plus-circle-svgrepo-com.svg')";
        songSection.querySelector(".play-options>div:nth-child(1)>div:nth-child(2)").style.backgroundSize = "cover";
        songSection.querySelector(".play-options>div:nth-child(1)>div:nth-child(3)").style.backgroundImage = "url('./Assets/three-dots-svgrepo-com.svg')";
        songSection.querySelector(".play-options>div:nth-child(1)>div:nth-child(3)").style.backgroundSize = "cover";
        let songList = document.querySelector(".song-list>div");
        let songListHeading = `<div class="song song-list-heading">
    <div>#</div>
    <div>Title</div>
    <div>Album</div>
    <div>Date Added</div>
    <div><div></div></div>
    </div>`;
        songList.insertAdjacentHTML("beforeend", songListHeading);
        let i;
        for (i = 0; i < 9; i++) {
            let num = i + 1;
            let title = "Song" + (i + 1);
            let album = "Album" + (i + 1);
            let dateAdded = `${i + 1} days ago`;
            let timeDurationProm = getDuration(`./Assets/Music/music${i + 1}.mp3`);
            audioArray.push(`./Assets/Music/music${i + 1}.mp3`);
            let timeDuration = 0;
            await timeDurationProm.then((value) => { timeDuration = Math.round(value); });
            let minute = Math.ceil(timeDuration / 60);
            let second = timeDuration % 60;
            if (minute <= 9) {
                minute = "0" + minute.toString();
            }
            else {
                minute = minute.toString();
            }
            if (second <= 9) {
                second = "0" + second.toString();
            }
            else {
                second = second.toString();
            }
            let individualSong = `<div class="song play play${i+1}">
    <div>${i + 1}</div>
    <div>${title}</div>
    <div>${album}</div>
    <div>${dateAdded}</div>
    <div>${minute}:${second}</div>
    </div>`;
            songList.insertAdjacentHTML("beforeend", individualSong);
        }
        document.querySelector(".songs").style.height = "max-content";
        let allSongs = document.querySelectorAll(".play");
        allSongs.forEach(song => {
            song.addEventListener("click", (e) => {
                let audioLink = audioArray[Number(song.classList[2].slice(4,))-1];
                let audioContainer = document.querySelector(".audio-container");
                if(audioContainer == null){
                let audioHtml = `<div><audio src="${audioLink}" controls></audio></div>`;
                audioContainer = document.createElement("div");
                audioContainer.classList.add("audio-container");
                audioContainer.insertAdjacentHTML("beforeend",audioHtml);
                document.querySelector(".songs").insertAdjacentElement("beforeend",audioContainer);
                }
                else{
                    document.querySelector(".audio-container>div>audio").src = `${audioLink}`;
                }
            })
        })
    });
});
let getDuration = function (src) {
    return new Promise((resolve, reject) => {
        try {
            let audio = new Audio(src);
            audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration == NaN ? 0 : audio.duration);
            });
        }
        catch {
            resolve(0);
        }
    });
}
