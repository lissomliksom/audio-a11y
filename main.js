
/*********************************************************************************************
 * 
 * AUDIO PLAYER ELEMENTS
 * Define all audio-player elements
 * 
 *********************************************************************************************/

const audioPlayerContainer = document.getElementById('audio-player-container')

const audioCover = document.getElementById('audio-cover')
const audioTitle = document.getElementById('audio-title')
const audioArtist = document.getElementById('audio-artist')
const audioAlbum = document.getElementById('audio-album')

const audio = document.getElementById('audio')

const audioPercentagePlayed = document.getElementById('audio-percentage-played')
const audioTimeCurrent = document.getElementById('audio-time-current')
const audioTimeTotal = document.getElementById('audio-time-total')
const audioControllerPrevious = document.getElementById('audio-controller-previous')
const audioControllerSkipBackward = document.getElementById('audio-controller-skip-backward')
const audioControllerPlay = document.getElementById('audio-controller-play')
const audioControllerSkipForward = document.getElementById('audio-controller-skip-forward')
const audioControllerNext = document.getElementById('audio-controller-next')

const audioTrackList = document.getElementById('audio-track-list')


/*********************************************************************************************
 * 
 * AUDIO PLAYER DATA AND STATE
 * Define track data and state
 * 
 *********************************************************************************************/

// Complete tracklist. In a real-world app, I'd load this dynamically from an API or database.
const audioTracks = [
  {
    title: 'Introduksjon',
    artist: 'Simen Kristoffersen',
    album: 'Talldetektiv Mynthe fra Zurgalon Zeta',
    cover: 'https://lesekloden.no/storage/audio/audiobooks/thumbnail_demo_intro.png',
    src: 'https://lesekloden.no/storage/audio/audiobooks/introduksjon.mp3',
  },
  {
    title: 'Prolog',
    artist: 'Simen Kristoffersen',
    album: 'Talldetektiv Mynthe fra Zurgalon Zeta',
    cover: 'https://lesekloden.no/storage/audio/audiobooks/thumbnail_demo_prolog.png',
    src: 'https://lesekloden.no/storage/audio/audiobooks/prolog.mp3',
  },
  {
    title: 'Kapittel 1: Leggetid',
    artist: 'Simen Kristoffersen',
    album: 'Talldetektiv Mynthe fra Zurgalon Zeta',
    cover: 'https://lesekloden.no/storage/audio/audiobooks/thumbnail_demo_1.png',
    src: 'https://lesekloden.no/storage/audio/audiobooks/kapittel1.mp3',
  },
  {
    title: 'Kapittel 2: Talldetektiven',
    artist: 'Simen Kristoffersen',
    album: 'Talldetektiv Mynthe fra Zurgalon Zeta',
    cover: 'https://lesekloden.no/storage/audio/audiobooks/thumbnail_demo_2.png',
    src: 'https://lesekloden.no/storage/audio/audiobooks/kapittel2.mp3',
  },
]

// Set starting audio track and load it
let audioIdx = 0
audioLoad(audioTracks[audioIdx])

// SVG Icons from FeatherIcons
const iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ml-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`
const iconPause = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`


/*********************************************************************************************
 * 
 * AUDIO PLAYER FUNCTIONALITY
 * Functions for loading, playing, pausing, and updating audio player
 * 
 *********************************************************************************************/

// Load audio track, update title and cover
function audioLoad(data) {
  audioCover.src = data.cover
  audioTitle.innerText = data.title
  audioArtist.innerText = data.artist
  audioAlbum.innerText = data.album
  audio.src = data.src
}

// Play audio track. Replace play/pause-icon, update aria-label
function audioPlay() {
  audioPlayerContainer.classList.add('is-playing')
  audioControllerPlay.innerHTML = iconPause
  audioControllerPlay.setAttribute('aria-label', 'Pause lydklipp')
  audio.play()
}

// Pause audio track. Replace play/pause-icon, update aria-label
function audioPause() {
  audioPlayerContainer.classList.remove('is-playing')
  audioControllerPlay.innerHTML = iconPlay
  audioControllerPlay.setAttribute('aria-label', 'Spill av lydklipp')
  audio.pause()
}

// Update play/pause-state
function audioStateUpdate() {
  const isPlaying = audioPlayerContainer.classList.contains('is-playing')
  if (isPlaying) { 
    audioPause() 
  } else { 
    audioPlay() 
  }
}

function audioPrevious() {
  audioIdx--
  if (audioIdx < 0) {
    audioIdx = audioTracks.length - 1
  }
  audioLoad(audioTracks[audioIdx])
  audioPlay()
}

function audioNext() {
  audioIdx++
  if (audioIdx > audioTracks.length - 1) {
    audioIdx = 0
  }
  audioLoad(audioTracks[audioIdx])
  audioPlay()
}

function skipForward() {
    audio.currentTime += 30
  }
function skipBackward() {
  audio.currentTime -= 30
}

// Format time in format 00:00. In a real-world app, I'd add hours too.
function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  const roundedSeconds = Math.round(seconds)
  return `${minutes < 10 ? '0' : ''}${minutes}:${roundedSeconds < 10 ? '0' : ''}${roundedSeconds}`
}

// Update progress bar: 
function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercentage = (currentTime / duration) * 100
  audioPercentagePlayed.value = `${progressPercentage}`
  audioTimeCurrent.innerText = formatTime(currentTime)
  audioTimeTotal.innerText = formatTime(duration)
  audio.ariaValueText = `${Math.round(progressPercentage)}%`
}

// Set progress bar: Get width of element, register where it is clicked, update currentTime
function setProgress(e) {
  const elWidth = this.clientWidth
  const clickLocationX = e.offsetX
  audio.currentTime = (clickLocationX / elWidth) * audio.duration
}


/*********************************************************************************************
 * 
 * AUDIO PLAYER TRACK LIST FUNCTIONALITY
 * Add all tracks to tracklist. Add event listeners for play/pause, next/previous and focus.
 * 
 *********************************************************************************************/

function renderTrackList(activeIdx = 0) {
  audioTrackList.innerHTML = audioTracks.map((track, idx) => {
    // const checkActiveIdx = activeIdx === idx ? 'background-color: #333' : ''
    const checkActiveIdx = ""
    return `
      <li role="listitem" >
        <button 
          style="${checkActiveIdx}"
          class="w-full p-2 transition duration-200 ease-in-out hover:bg-gray-50 focus:outline-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-2 list-button"
        >
          <div class="flex items-center justify-between px-4">
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>  
              </span>
              <span class="text-sm text-gray-700">
                ${track.title}
              </span>
            </div>
          </div>
        </button>
      </li>
    `
  }).join('')
}


window.addEventListener('DOMContentLoaded', () => {
  renderTrackList()
  const listButtons = document.querySelectorAll('.list-button')
  listButtons.forEach((button, idx) => {
    button.addEventListener('click', () => {
      console.log(idx)
      audioLoad(audioTracks[idx])
      audioPlay()
    })
  })
})





/*********************************************************************************************
 * 
 * EVENT LISTENERS
 * Add event listeners to audio-controller elements 
 * 
 *********************************************************************************************/

// Event listener: Play/pause button
audioControllerPlay.addEventListener('click', audioStateUpdate)

// Event listener: Play/pause on spacebar click. Prevent default to avoid scrolling.
window.addEventListener('keydown', (e) => {
  if (e.key === " ") {
    e.preventDefault()
    audioStateUpdate()
  }
})

// Event listener: Previous audio track, with button and arrow (left)
audioControllerPrevious.addEventListener('click', audioPrevious)
window.addEventListener('keydown', (e) => {
  if (e.key === "ArrowLeft") {
    e.preventDefault
    audioPrevious()
  }
})

// Event listener: Previous audio track, with button and arrow (right)
audioControllerNext.addEventListener('click', audioNext)
window.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") {
    audioNext()
  }
})

// Event listener: Skip forward or backward in audio track
audioControllerSkipBackward.addEventListener('click', skipBackward)
audioControllerSkipForward.addEventListener('click', skipForward)

// Event listener: Display length of initial audio track, set progress bar to 0
audio.addEventListener('loadedmetadata', () => {
  audioTimeTotal.innerText = formatTime(audio.duration)
  audioPercentagePlayed.value = '0'
})

// Event listener: If audio is playing, update the progress bar
audio.addEventListener('timeupdate', updateProgressBar)

// Event listener: If progress bar is clicked, update audio time
audioPercentagePlayed.addEventListener('click', setProgress)

// Event listener: When a song ends, play the next one
audio.addEventListener('ended', audioNext)  
