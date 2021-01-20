import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import CelestialSentence from "../celestial/CelestialSentence"

function Celestial() {

  const [renderScript, setRenderScript] = useState<string>("");
  const [size, setSize] = useState<string>("");

  function renderScriptChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setRenderScript(event.target.value);
  }

  function setSizeChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setSize(event.target.value);
  }

  return (
    <div>
      <h1>Celestial SVG Renderer</h1>
      <label>Render Script:  <input style={{width:"60%"}} value={renderScript} onChange={renderScriptChanged}></input></label>
      <label>Scale:  <input type="number" value={size} onChange={setSizeChanged}></input></label>
      <div style={{width:"100%", height:"300px", paddingTop: "10px"}}>
        {renderScript && <CelestialSentence renderScript={renderScript} minGlyphWidth={isNaN(parseInt(size)) ? 80 : parseInt(size)}/>}
      </div>
    </div>
  )
}


export default Celestial;