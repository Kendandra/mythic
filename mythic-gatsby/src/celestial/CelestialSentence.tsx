import React, { ReactElement, ReactSVGElement, useState } from "react"
import ADJ_Big from '../images/celestial/ADJ_Big.svg'
import ADJ_Both from '../images/celestial/ADJ_Both.svg'
import ADJ_Destroy from '../images/celestial/ADJ_Destroy.svg'
import ADJ_Make from '../images/celestial/ADJ_Make.svg'
import ADJ_No from '../images/celestial/ADJ_No.svg'
import ADJ_Small from '../images/celestial/ADJ_Small.svg'
import ADJ_That from '../images/celestial/ADJ_That.svg'
import ADJ_This from '../images/celestial/ADJ_This.svg'
import ADJ_Yes from '../images/celestial/ADJ_Yes.svg'
import LINK_Underbar from '../images/celestial/LINK_Underbar.svg'
import LINK_Verticalbar from '../images/celestial/LINK_Verticalbar.svg'
import MOD_Of from '../images/celestial/MOD_Of.svg'
import MOD_Question from '../images/celestial/MOD_Question.svg'
import MOD_With from '../images/celestial/MOD_With.svg'
import NOUN_Air from '../images/celestial/NOUN_Air.svg'
import NOUN_Down from '../images/celestial/NOUN_Down.svg'
import NOUN_Earth from '../images/celestial/NOUN_Earth.svg'
import NOUN_Fire from '../images/celestial/NOUN_Fire.svg'
import NOUN_Gate from '../images/celestial/NOUN_Gate.svg'
import NOUN_Light from '../images/celestial/NOUN_Light.svg'
import NOUN_Spirit from '../images/celestial/NOUN_Spirit.svg'
import NOUN_Start from '../images/celestial/NOUN_Start.svg'
import NOUN_Stop from '../images/celestial/NOUN_Stop.svg'
import NOUN_Up from '../images/celestial/NOUN_Up.svg'
import NOUN_Voice from '../images/celestial/NOUN_Voice.svg'
import NOUN_Water from '../images/celestial/NOUN_Water.svg'

interface CelestialSentenceProperties {
  renderScript: string;
  minGlyphWidth: number;
}

interface ComplexGlyph {
  name: string;
  glyph?: ReactElement;
}


function CelestialSentence(props: CelestialSentenceProperties) {
 
  const minGlpyhWidth = props.minGlyphWidth ?? 40;

  function getWidthPx(shrinkFactor: number = 1) : number {
    let shrinkRate = 1
    switch (shrinkFactor) {
      case 1:
        shrinkRate = 1;
        break;
      case 2:
        shrinkRate = 0.50;
        break;
      case 3:
        shrinkRate = 0.25;
        break;
      case 4:
        shrinkRate = 0.125;
        break;
      case 5:
        shrinkRate = 0.625;
        break;
      case 6:
        shrinkRate = 0.3125;
        break;
      case 7:
        shrinkRate = 0.15625;
        break;
      case 8:
        shrinkRate = 0.078125;
        break;
      case 9:
        shrinkRate = 0.0390625;
        break;
      default:
        shrinkRate = 1;
        break;
    }

    return minGlpyhWidth * shrinkRate; 
  }

  function toPremadeGlyph(source: string, shrinkFactor: number = 0) : ComplexGlyph {
    source = source.toLocaleLowerCase();

    const bigSpirit = toComlexGlyphs([{name: 'spirit'}], [{name: 'big'}], true, shrinkFactor+1);

    switch(source) {
      case 'say': return toComlexGlyphs([{name: 'voice'}], [], false, shrinkFactor);
      case 'open': return toComlexGlyphs([{name: 'gate'}], [{name: 'make'}], true, shrinkFactor);
      case 'close': return toComlexGlyphs([{name: 'gate'}], [{name: 'destory'}], true, shrinkFactor);
      case 'goddes':
      case 'god': return toComlexGlyphs([{name: 'of'}, {name: '|'}, bigSpirit], [], true, shrinkFactor);
      case 'person': return toComlexGlyphs([{name: 'of'}, {name: '|'}, {name: 'spirit'}], [], true, shrinkFactor);
      case 'me':
      case 'i': 
        return toComlexGlyphs([{name: 'of'}, {name: '|'}, {name: 'spirit'}], [{name: "this"}], true, shrinkFactor);
      case 'them':
      case 'you': 
        return toComlexGlyphs([{name: 'of'}, {name: '|'}, {name: 'spirit'}], [{name: "that"}], true, shrinkFactor);
      case 'we': return toComlexGlyphs([{name: 'of'}, {name: '|'}, {name: 'spirit'}], [{name: "both"}], true, shrinkFactor);
      case 'and':
      case 'yes': return toComlexGlyphs([{name: 'yes'}], [], false, shrinkFactor);
      case 'makes': return toComlexGlyphs([{name: 'make'}], [], false, shrinkFactor);
      case '?': return toComlexGlyphs([{name: '?'}], [], false, shrinkFactor);
      default: return toComlexGlyphs([{name: source}], [], true, shrinkFactor);
    }
  }


  function toGlyph(source: ComplexGlyph, shrinkFactor: number = 0) : ReactElement {

    if(source.glyph) {
      return source.glyph;
    }

    const str = source.name.toLocaleLowerCase();

    const scale = `${getWidthPx(shrinkFactor)}px`;

    switch(str) {
      case 'big': return <ADJ_Big height={scale} width={scale}/>;
      case 'both': return <ADJ_Both height={scale} width={scale}/>;
      case 'destroy': return <ADJ_Destroy height={scale} width={scale}/>;
      case 'make': return <ADJ_Make height={scale} width={scale}/>;
      case 'not':
      case 'no': return <ADJ_No height={scale} width={scale}/>;
      case 'small': return <ADJ_Small height={scale} width={scale}/>;
      case 'that': return <ADJ_That height={scale} width={scale}/>;
      case 'this': return <ADJ_This height={scale} width={scale}/>;
      case 'yes': return <ADJ_Yes height={scale} width={scale}/>;
      case 'of': return <MOD_Of height={scale} width={scale}/>;
      case '?':
      case 'question': return <MOD_Question height={scale} width={scale}/>;
      case 'with': return <MOD_With height={scale} width={scale}/>;
      case 'air': return <NOUN_Air height={scale} width={scale}/>;
      case 'down': return <NOUN_Down height={scale} width={scale}/>;
      case 'earth': return <NOUN_Earth height={scale} width={scale}/>;
      case 'stone':
      case 'fire': return <NOUN_Fire height={scale} width={scale}/>;
      case 'gate': return <NOUN_Gate height={scale} width={scale}/>;
      case 'light': return <NOUN_Light height={scale} width={scale}/>;
      case 'spirit': return <NOUN_Spirit height={scale} width={scale}/>;
      case 'go':
      case 'start': return <NOUN_Start height={scale} width={scale}/>;
      case 'stop': return <NOUN_Stop height={scale} width={scale}/>;
      case 'up': return <NOUN_Up height={scale} width={scale}/>;
      case 'voice': return <NOUN_Voice height={scale} width={scale}/>;
      case 'water': return <NOUN_Water height={scale} width={scale}/>;

      case '_': return <LINK_Underbar preserveAspectRatio="none" height="5px" width={"90%"}/>;
      case '|': return <LINK_Verticalbar style={{marginBottom:`${minGlpyhWidth * -0.5}px`}} preserveAspectRatio="none" height={scale} width={"5px"}/>;

      default: return <ADJ_No width={scale} height={`${getWidthPx(shrinkFactor-1)}px`} stoke="red" fill="red"/>
    }
  }

  function toComlexGlyphs(words: ComplexGlyph[], modifiers: ComplexGlyph[], underbar: boolean = true, shrinkFactor: number = 0) : ComplexGlyph {

    let scaleFactor = getWidthPx(shrinkFactor);
    let horizontalGlyphNumber = Math.max(words?.length ?? 1, modifiers?.length ?? 1);

    function getStyleOverride(glyph: ComplexGlyph) : React.CSSProperties {
      switch(glyph.name) {
        case '|': return {alignSelf: 'center', marginBottom: `${-scaleFactor/2}px`};
        default: return {alignSelf: "flex-end"};
      }
    }

    return {name: `(${words.map(w => w.name).join(' ')}${underbar ? '_' : ''}(${modifiers.map(m => m.name).join('-')})`, 
    glyph: ( 
      <div style={{width: `${scaleFactor * horizontalGlyphNumber}px`, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
      {words.map((e, i) => <div key={i} style={getStyleOverride(e)}>{toGlyph(e, shrinkFactor+1)}</div>)}

      {underbar && <>
        <div style={{flexBasis: "100%", height: "0"}}>{/* forces new line */}</div>
        <div style={{margin: "-5px;", alignSelf: "flex-start", width: "100%"}}>{toGlyph({name: '_'}, shrinkFactor+1)}</div>

        {modifiers?.length > 0 && modifiers.map((e, i) => <div key={i} style={{}}>{toGlyph(e, shrinkFactor+1)}</div>)}
      </>}

    </div>)}
  }

  function parseToGlyphs(str: string) : ReactElement[] {
    const words = str.split(' ');

    // convert all words to glyphs if possible
    return words.map(w => toPremadeGlyph(w).glyph)
  }

  return (
    <div>
      <div style={{display: "flex", alignItems: "center"}}>
      {parseToGlyphs(props.renderScript)}
      </div>
    </div>
    )
  }

  export default CelestialSentence;