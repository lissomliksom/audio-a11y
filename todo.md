# Todo

## General

- Create a custom Javascript-element
- Use isPlaying-flag as a state-variable instead of toggling classList
- Use isSkipFocus-flag as a state-variable to better control keyboard-input.
  ```
  window.addEventListener('keydown', ()=> {
    if(ifSkipFocus === true) {
    audioSkip()
    } else {
    audioNext()
    }
    })
  ```

## A11y

- The audio element is not supported in all browsers. Add a fallback if it's not supported.
- Add tabindex to improve controller focus.
- Do screenreader testing.

## Tracklist

- Change background color if current track is playing.

# Future functionality

- Autoplay true/false.
- Shuffle true/false.
- Add speed controls: 0.5, 1, 1.5, 2.
- Volume controls.
- Save current track, volume, autoplay settings, shuffle settings, and current play-time in localStorage.
