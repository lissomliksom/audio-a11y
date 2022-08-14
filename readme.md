# Audio player

A simple audio player with focus on accesibility.

## A11y considerations:

- Text passes all tests for WCAG Color contrasts
- Added enhanced focus-state for pause/play button
- Keyboard controls: Play/pause with spacebar, skip songs with arrows left/right
- Aria-label properties for all key controllers
- Dynamic aria-label on play/pause-button
- Dynamic aria-valuetext on range-input.

## Future functionality

- Add options for increasing text-size
- Add animation to show if audio is playing or not
- Keyboard a11y:
  -- Register if a key is already pressed down, to avoid multiple keydown events (i.e. toggling play/pause on and off indefinitely)
  -- Register if a key is already pressed down, to avoid strange behaviours when multiple keys are pressed at once
  -- When progress bar is in focus, arrow keys should cause a time-skip within current track and not skip to next/previous track
  -- When tracklist is in focus, a user should be able to scroll using arrow keys
  -- When tracklist is in focus, a user should be able to start playing selected track with enter key

For more details, see todo.md
