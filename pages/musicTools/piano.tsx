import { CheckBox, PageGenerator, StandardGrid } from "components"
import { musicTools } from "databases"
import { Howl } from "howler"
import { getLocaledTitles, useToggle } from "modules"
import { useEffect, useState } from "react"
import { note } from "tonal"

const soundEngine = {
  init() {
    const noteLength = 2400
    let timeIndex = 0
    for (let i = 24; i <= 96; i++) {
      sound["_sprite"][i] = [timeIndex, noteLength]
      timeIndex += noteLength
    }
  },
  play(noteName: string) {
    sound.volume(0.5)
    sound.play(String(note(noteName).midi - 12))
  }
}

const sound = new Howl({
  src: ["/piano.mp3"],
  onload() {
    soundEngine.init()
  }
})

function Key({ styles, x, toDisplay, note, shortcut }: { styles: { stroke: string, fill: string, width: number, height: number }, x: number, toDisplay?: string[], note: string, shortcut: string }) {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    function keyDown(event) {
      if (!event.repeat && event.key === shortcut) {
        soundEngine.play(note.replace("B", "Bb").replace("H", "B"))
        setClicked(true)
      }
    }
    function keyUp(event) {
      if (!event.repeat && event.key === shortcut) setClicked(false)
    }

    document.addEventListener("keydown", keyDown)
    document.addEventListener("keyup", keyUp)


    return () => {
      document.removeEventListener("keydown", keyDown)
      document.removeEventListener("keyup", keyUp)
    }
  })

  return <g textAnchor="middle">
    <rect
      {...styles}
      {...{ x }}
      fill={clicked ? "yellow" : styles.fill}
      onPointerDown={() => {
        setClicked(true)
        soundEngine.play(toDisplay.at(-1).replace("B", "Bb").replace("H", "B"))
      }}
      onPointerUp={() => { setClicked(false) }}
    />
    {toDisplay.map((note, index) =>
      <text
        pointerEvents={"none"}
        style={{ userSelect: "none" }}
        fill={clicked ? "black" : styles.stroke}
        x={x + styles.width * 0.5}
        y={styles.height * (0.9 - index * 0.2)}
        fontSize={styles.width * 0.4}
        key={note}
      >{note}</text>
    )}
  </g>
}

export default function Piano() {
  const titles = getLocaledTitles()

  const allNotes = "CDEFGAH".split("")
  const [sharps, flats] = [["C#", "D#", "F#", "G#", "A#"], ["Db", "Eb", "Gb", "Ab", "B"]]
  const [startNote, startOctave] = ["C", "2"]
  const [endNote, endOctave] = ["C", "7"]
  const [showNotes, toggleShowNotes] = useToggle(true)
  const [showShortcuts, toggleShowShortcuts] = useToggle(true)

  const shortcuts = "1234567890qwertyuiopasdfghjklzxcvbnm"
  const sharpShortcuts = "!@#$%^&*()QWERTYUIOPASDFGHJKLZXCVBNM"

  const [firstNotePosition, lastNotePosition] = [allNotes.indexOf(startNote), allNotes.indexOf(endNote)]

  const notes = [...Array(Number(endOctave) - Number(startOctave) + 1).keys()]
    .map(octave => (
      !octave ? allNotes.slice(firstNotePosition) :
        octave === Number(endOctave) - Number(startOctave) ? allNotes.slice(0, lastNotePosition + 1) :
          allNotes)
      .map(noteName => noteName + (octave + Number(startOctave)))
    ).flat()

  const whiteKey = {
    stroke: "black",
    fill: "white",
    width: 80,
    height: 400
  }
  const blackKey = {
    stroke: "white",
    fill: "black",
    width: whiteKey.width * 0.9,
    height: whiteKey.height / 2
  }

  return <PageGenerator database={musicTools} name="piano">
    <StandardGrid>
      <CheckBox onChange={toggleShowNotes} title={titles.showNotes} value={showNotes} />
      <CheckBox onChange={toggleShowShortcuts} title={titles.showShortcuts} value={showShortcuts} />
    </StandardGrid>
    <svg viewBox={`0 0 ${notes.length * whiteKey.width} ${whiteKey.height}`}>
      {notes.map((note, index) =>
        <Key
          toDisplay={[showShortcuts && shortcuts[index], showNotes && note]}
          {...{ note }}
          styles={whiteKey}
          x={whiteKey.width * index}
          key={note}
          shortcut={shortcuts[index]}
        />
      )}
      {notes.map((note, index) => {
        const sharp = sharps.find(shartNote => shartNote[0] === note[0])
        const flat = flats[sharps.indexOf(sharp)]

        return !"EH".includes(note[0]) && index + 1 !== notes.length && <Key
          toDisplay={[
            showShortcuts && sharpShortcuts[index],
            showNotes && [sharp + note.slice(1), flat + note.slice(1)]
          ].flat()}
          note={sharp + note.slice(1)}
          styles={blackKey}
          x={whiteKey.width * (index + 1) - blackKey.width / 2}
          key={note}
          shortcut={sharpShortcuts[index]}
        />
      })}
    </svg>
  </PageGenerator>
}
