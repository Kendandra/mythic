import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import CelestialSentence from "../celestial/CelestialSentence"

function Celestial() {

  const [renderScript, setRenderScript] = useState<string>("");
  const [size, setSize] = useState<number>(20);

  function renderScriptChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setRenderScript(event.target.value);
  }

  function setSizeChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const cast = parseInt(event.target.value)
    setSize(isNaN(cast) ? 40 : cast);
  }

  return (
    <div>
      <h1>Celestial SVG Renderer</h1>
      <label>Render Script:  <input value={renderScript} onChange={renderScriptChanged}></input></label>
      <label>Scale:  <input value={size} onChange={setSizeChanged}></input></label>
      <div style={{width:"100%", height:"300px", paddingTop: "10px"}}>
        {renderScript && <CelestialSentence renderScript={renderScript} minGlyphWidth={size}/>}
      </div>
    </div>
  )
}


export default Celestial;