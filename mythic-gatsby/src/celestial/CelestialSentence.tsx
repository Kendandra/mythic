import React, { ReactElement, ReactSVGElement, useState } from "react"
import styles from './celestial.module.css'

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
import MOD_From from '../images/celestial/MOD_From.svg'
import NOUN_Air from '../images/celestial/NOUN_Air.svg'
import NOUN_Down from '../images/celestial/NOUN_Down.svg'
import NOUN_Earth from '../images/celestial/NOUN_Earth.svg'
import NOUN_Fire from '../images/celestial/NOUN_Fire.svg'
import NOUN_Gate from '../images/celestial/NOUN_Gate.svg'
import NOUN_Light from '../images/celestial/NOUN_Light.svg'
import NOUN_Spirit from '../images/celestial/NOUN_Spirit.svg'
import NOUN_Start from '../images/celestial/NOUN_Start.svg'
import NOUN_Stop from '../images/celestial/NOUN_Stop.svg'
import NOUN_Story from '../images/celestial/NOUN_Story.svg'
import NOUN_Up from '../images/celestial/NOUN_Up.svg'
import NOUN_Voice from '../images/celestial/NOUN_Voice.svg'
import NOUN_Water from '../images/celestial/NOUN_Water.svg'
import NOUN_Bird from '../images/celestial/NOUN_Bird.svg'
import NOUN_Crimson from '../images/celestial/NOUN_Crimson.svg'
import NOUN_Death from '../images/celestial/NOUN_Death.svg'
import NOUN_Fall from '../images/celestial/NOUN_Fall.svg'
import NOUN_Future from '../images/celestial/NOUN_Future.svg'
import NOUN_Hammer from '../images/celestial/NOUN_Hammer.svg'
import NOUN_House from '../images/celestial/NOUN_House.svg'
import NOUN_Eye from '../images/celestial/NOUN_Eye.svg'
import NOUN_Jail from '../images/celestial/NOUN_Jail.svg'
import NOUN_Magic from '../images/celestial/NOUN_Magic.svg'
import NOUN_Meet from '../images/celestial/NOUN_Meet.svg'
import NOUN_Now from '../images/celestial/NOUN_Now.svg'
import NOUN_Past from '../images/celestial/NOUN_Past.svg'
import NOUN_Rise from '../images/celestial/NOUN_Rise.svg'
import NOUN_Shape from '../images/celestial/NOUN_Shape.svg'
import NOUN_Sun from '../images/celestial/NOUN_Sun.svg'
import NOUN_Surprise from '../images/celestial/NOUN_Surprise.svg'
import NOUN_Sword from '../images/celestial/NOUN_Sword.svg'
import NOUN_Time from '../images/celestial/NOUN_Time.svg'
import NOUN_Tree from '../images/celestial/NOUN_Tree.svg'

import NUM_Zero from '../images/celestial/NUM_Zero.svg'
import NUM_One from '../images/celestial/NUM_One.svg'
import NUM_Two from '../images/celestial/NUM_Two.svg'
import NUM_Three from '../images/celestial/NUM_Three.svg'


interface CelestialSentenceProperties {
  renderScript: string;
  minGlyphWidth: number;
}

interface ComplexGlyph {
  name: string;
  glyph?: ReactElement;
  baseGlyphNumber?: number;
  narrowWidthGlyphNumber?: number;
}


function CelestialSentence(props: CelestialSentenceProperties) {
 
  const minGlpyhWidth = props.minGlyphWidth ?? 40;
  const narrowWidthGlyphInPx = 5;

  function convertToBaseFour(source: Number) : Number[] {
    // Figure out the number in base 4, the Celestial numbering scheme
    let convert: Number = source;
    let digits: Number[] = [];
    while(true) {
      let quotent: Number = +convert / 4;
      let remainder: Number = Math.trunc(+convert % 4);
      digits.push(remainder);
      convert = quotent;
      if(quotent < 1) {
        break;
      }
    } 
    return digits.reverse();
  }

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

    if(source.includes('-') || source.includes('/')) {
      const parts: string[] = source.split('/');
      const words: string = parts[0] ?? "";
      const modifiers = parts[1] ?? "";
      const wordGlyphs: ComplexGlyph[] = words.split('-').filter(s => s !== "").map<ComplexGlyph>((s, i) => (toPremadeGlyph(s, shrinkFactor)));
      const modifierGlyphs: ComplexGlyph[] = modifiers.split('-').filter(m => m !== "").map<ComplexGlyph>((m, i) => (toPremadeGlyph(m, shrinkFactor)));

      return toComlexGlyphs(
        wordGlyphs, 
        modifierGlyphs, 
        true, 
        shrinkFactor)
    }

    const useUnderbar = !source.includes('*');
    source = source.replace('*', '');

    // Check to see if it's a number, if so, parse it into glyphs.
    const sourceAsNumber = parseInt(source);
    if(!isNaN(sourceAsNumber)) {
      var digits = convertToBaseFour(sourceAsNumber);
      return toComlexGlyphs(digits.map<ComplexGlyph>(d => {return {name: `${d}`}}), [], useUnderbar, shrinkFactor);
    }


    // Common compound glyphs
    const bigSpirit = toComlexGlyphs([{name: 'spirit'}], [{name: 'big'}], true, shrinkFactor+1);
    const bigEarth = toComlexGlyphs([{name: 'earth'}], [{name: 'big'}], true, shrinkFactor+1);
    const closed = toComlexGlyphs([{name: 'gate'}], [{name: 'destroy'}], useUnderbar, shrinkFactor+1);
    const link = {name: '|', baseGlyphNumber: 0, narrowWidthGlyphNumber: 1}
    
    // Translate to (possibly) nested glyphs
    switch(source) {
      case 'from|': return toComlexGlyphs([{name: 'from'}, link], [], useUnderbar, shrinkFactor);
      case '|from': return toComlexGlyphs([link, {name: 'from'}], [], useUnderbar, shrinkFactor);
      case 'of|': return toComlexGlyphs([{name: 'of'}, link], [], useUnderbar, shrinkFactor);
      case '|of': return toComlexGlyphs([link, {name: 'of'}], [], useUnderbar, shrinkFactor);

      case 'mountain': return toComlexGlyphs([{name: 'from'}, link, bigEarth], [], useUnderbar, shrinkFactor);

      case 'sleep': return toComlexGlyphs([{name: 'eye'}], [closed], useUnderbar, shrinkFactor);

      case 'meet|':
      case 'upon':
      case 'on': return toComlexGlyphs([{name:'meet'}, link], [], useUnderbar, shrinkFactor);

      case 'tell':
      case 'speak':
      case 'say': return toComlexGlyphs([{name: 'voice'}], [], false, shrinkFactor);
      case 'open': return toComlexGlyphs([{name: 'gate'}], [{name: 'make'}], useUnderbar, shrinkFactor);
      case 'close': return toComlexGlyphs([{name: 'gate'}], [{name: 'destroy'}], useUnderbar, shrinkFactor);
      case 'goddess':
      case 'god': return toComlexGlyphs([{name: 'from'}, link, bigSpirit], [], useUnderbar, shrinkFactor);
      case 'person': return toComlexGlyphs([{name: 'from'}, link, {name: 'spirit'}], [], useUnderbar, shrinkFactor);
      case 'me':
      case 'i': 
        return toComlexGlyphs([{name: 'from'}, link, {name: 'spirit'}], [{name: "this"}], useUnderbar, shrinkFactor);
      case 'them':
      case 'you': 
        return toComlexGlyphs([{name: 'from'}, link, {name: 'spirit'}], [{name: "that"}], useUnderbar, shrinkFactor);
      case 'we': return toComlexGlyphs([{name: 'from'}, link, {name: 'spirit'}], [{name: "both"}], useUnderbar, shrinkFactor);
      case 'and':
      case 'yes': return toComlexGlyphs([{name: 'yes'}], [], false, shrinkFactor);
      case 'makes': return toComlexGlyphs([{name: 'make'}], [], false, shrinkFactor);
      case 'where': return toComlexGlyphs([{name: 'meet'}], [{name: '?'}], true, shrinkFactor);
      case 'shadow': return toComlexGlyphs([{name: 'light'}], [{name: '?'}], true, shrinkFactor);
      case 'dark': return toComlexGlyphs([{name: 'light'}], [{name: 'no'}], true, shrinkFactor);

      case '?': return toComlexGlyphs([{name: '?'}], [], false, shrinkFactor);
      default: 
        // Attempt to break up

        return toComlexGlyphs([{name: source}], [], useUnderbar, shrinkFactor);
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
      case 'from': return <MOD_From height={scale} width={scale}/>;
      case 'air': return <NOUN_Air height={scale} width={scale}/>;
      case 'down': return <NOUN_Down height={scale} width={scale}/>;
      case 'stone':
      case 'rock':
      case 'earth': return <NOUN_Earth height={scale} width={scale}/>;
      case 'fire': return <NOUN_Fire height={scale} width={scale}/>;
      case 'gate': return <NOUN_Gate height={scale} width={scale}/>;
      case 'light': return <NOUN_Light height={scale} width={scale}/>;
      case 'spirit': return <NOUN_Spirit height={scale} width={scale}/>;
      case 'go':
      case 'start': return <NOUN_Start height={scale} width={scale}/>;
      case 'stop': return <NOUN_Stop height={scale} width={scale}/>;
      case 'tale':
      case 'story': return <NOUN_Story height={scale} width={scale}/>;
      case 'up': return <NOUN_Up height={scale} width={scale}/>;
      case 'sound':
      case 'voice': return <NOUN_Voice height={scale} width={scale}/>;
      case 'water': return <NOUN_Water height={scale} width={scale}/>;
      case 'magic': return <NOUN_Magic height={scale} width={scale}/>;
      case 'crimson': return <NOUN_Crimson height={scale} width={scale}/>;
      case 'past': return <NOUN_Past height={scale} width={scale}/>;
      case 'future': return <NOUN_Future height={scale} width={scale}/>;
      case 'now': return <NOUN_Now height={scale} width={scale}/>;
      case 'time': return <NOUN_Time height={scale} width={scale}/>;
      case 'sword': return <NOUN_Sword height={scale} width={scale}/>;
      case 'death': return <NOUN_Death height={scale} width={scale}/>;
      case 'meet': return <NOUN_Meet height={scale} width={scale}/>;
      case 'day':
      case 'sun': return <NOUN_Sun height={scale} width={scale}/>;
      case 'eye': return <NOUN_Eye height={scale} width={scale}/>;
      case 'blind':
      case 'surprise': return <NOUN_Surprise height={scale} width={scale}/>;
      case 'hammer': return <NOUN_Hammer height={scale} width={scale}/>;
      case 'fly':
      case 'bird': return <NOUN_Bird height={scale} width={scale}/>;
      case 'tree': return <NOUN_Tree height={scale} width={scale}/>;
      case 'house': return <NOUN_House height={scale} width={scale}/>;
      case 'rase':
      case 'rise': return <NOUN_Rise height={scale} width={scale}/>;
      case 'drop':
      case 'fall': return <NOUN_Fall height={scale} width={scale}/>;
      case 'shape': return <NOUN_Shape height={scale} width={scale}/>;
      case 'trap':
      case 'jail': return <NOUN_Jail height={scale} width={scale}/>;

      case '0': return <NUM_Zero height={scale} width={scale}/>;
      case '1': return <NUM_One height={scale} width={scale}/>;
      case '2': return <NUM_Two height={scale} width={scale}/>;
      case '3': return <NUM_Three height={scale} width={scale}/>;

      case '_': return <LINK_Underbar preserveAspectRatio="none" height="5px" width={"95%"}/>;
      case '|': return <LINK_Verticalbar style={{marginBottom:`${minGlpyhWidth * -0.15}px`}} preserveAspectRatio="none" height={scale} width={"5px"}/>;

      // Otherwise return a RED glyph that says "not found"
      default: return <ADJ_No width={scale} height={`${getWidthPx(shrinkFactor-1)}px`} stoke="red" fill="red"/>
    }
  }

  function toComlexGlyphs(words: ComplexGlyph[], modifiers: ComplexGlyph[], underbar: boolean = true, shrinkFactor: number = 0) : ComplexGlyph {

    let scaleFactor = getWidthPx(shrinkFactor);
    let horizontalGlyphNumber = Math.max(
      words.map(w => w.baseGlyphNumber ?? 1).reduce((count, w) => (count+w), 0) ?? 1, 
      modifiers.map(m => m.baseGlyphNumber ?? 1).reduce((count, m) => (count+m), 0) ?? 1);
    let narrowWidthGlyphNumber = Math.max(
      words.map(w => w.narrowWidthGlyphNumber ?? 0).reduce((count, w) => (count+w), 0) ?? 1, 
      modifiers.map(m => m.narrowWidthGlyphNumber ?? 0).reduce((count, m) => (count+m), 0) ?? 1);

    function getStyleOverride(glyph: ComplexGlyph) : React.CSSProperties {
      switch(glyph.name) {
        case '|': return {alignSelf: 'center'};
        default: return {alignSelf: "flex-end"};
      }
    }

    return {name: `(${words?.map(w => w.name).join(' ')}${underbar ? '_' : ''}(${modifiers?.map(m => m.name).join('-')})`, 
      glyph: ( 
        <div key={`${words.map(w => w.name).join(' ')} / ${modifiers.map(w => w.name).join(' ')}`}
          className={styles.glyph}
          title={`${horizontalGlyphNumber}|${narrowWidthGlyphNumber}-${shrinkFactor} ${words.map(w => w.name).join(' ')} / ${modifiers.map(w => w.name).join(' ')}`} 
          style={{width: `${(scaleFactor * horizontalGlyphNumber) + (narrowWidthGlyphNumber * narrowWidthGlyphInPx)}px`, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
          {words.map((e, i) => <div key={i} style={getStyleOverride(e)}>{toGlyph(e, shrinkFactor+1)}</div>)}

          {underbar && <>
            <div style={{flexBasis: "100%", height: "0"}}>{/* forces new line */}</div>
            <div style={{margin: `${-0.15*scaleFactor}px`, alignSelf: "flex-start", width: "100%"}}>{toGlyph({name: '_'}, shrinkFactor+1)}</div>
          </>}

          {modifiers?.length > 0 && modifiers.map((e, i) => <div key={i} style={{}}>{toGlyph(e, shrinkFactor+1)}</div>)}

        </div>),
      baseGlyphNumber: horizontalGlyphNumber,
      narrowWidthGlyphNumber: narrowWidthGlyphNumber
      }
  }

  function parseToGlyphs(str: string, nestLevel: number = 0) : ReactElement[] {
   
    let mode: string;
    switch (nestLevel) {
      case 1: 
        mode = ' ';
        break;
      case 2:
        mode = '-';
        break;
      case 3:
        mode = '/'
        break;
      default:
        mode = ' ';
        break;
    }

    //console.log(`Parsing '${str}' with level ${nestLevel}, mode: '${mode}'`);

    let words: string[] = str.split(mode);
    return words.flatMap((w, i) => <React.Fragment key={`${w}-${i}`}>{toPremadeGlyph(w, nestLevel).glyph}</React.Fragment>);
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