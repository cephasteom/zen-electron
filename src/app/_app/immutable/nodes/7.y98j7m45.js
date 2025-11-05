import{d as w}from"../chunks/Dnt3WWCM.js";import{f as c,h as j,a as l}from"../chunks/DagXSqBC.js";import"../chunks/DWWXGa6_.js";import{$ as x,c as s,s as p,r as e,t as k,l as y}from"../chunks/e0Y00CSs.js";import{s as S}from"../chunks/D1eO-sKs.js";import{e as C,i as T,s as _}from"../chunks/BYkFvx8V.js";import{f as q,a as F}from"../chunks/DCw9aPOv.js";const Z=w,A=!0,se=Object.freeze(Object.defineProperty({__proto__:null,csr:Z,prerender:A},Symbol.toStringTag,{value:"Module"})),E=`# Intro

Welcome to Zen! This tutorial assumes no previous knowledge of Zen, Live Coding, or JavaScript. We'll start with some basic coding skills and work our way up to Zen's more advanced features. Along the way, you can test your skills with a range of coding challenges, and there are composition prompts and project ideas at the end to help you get started making music with Zen.

Please feel free to skip the chapters that you find less interesting, and jump to the parts that you want to learn more about. You can always come back later! If you spot something that you think could be improved, please open an issue or a pull request using the GitHub link in the footer.
`,P=`# JavaScript Basics
Welcome to the JavaScript Basics chapter of the Zen tutorial! In this chapter, we'll cover some fundamental concepts of JavaScript that are essential for using Zen effectively.

## Variables
In JavaScript, variables are used to store data values. You can declare a variable using the \`let\`, \`const\`, or \`var\` keywords. For example:


\`\`\`javascript
let x = 10;
const y = 20;
var z = x + y;
\`\`\`

## Data Types
JavaScript has several data types, including:
- **Number**: Represents numeric values (e.g., \`42\`, \`3.14\`).
- **String**: Represents text (e.g., \`"Hello, World!"\`).
- **Boolean**: Represents logical values (\`true\` or \`false\`).
- **Array**: Represents a list of values (e.g., \`[1, 2, 3]\`).
- **Object**: Represents a collection of key-value pairs (e.g., \`{name: "Zen", type: "language"}\`).

## Functions
Functions are blocks of code that can be reused. You can define a function using the \`function\` keyword or as an arrow function. For example:

\`\`\`javascript
function add(a, b) {
    return a + b;
}

const multiply = (a, b) => a * b;
\`\`\`

## Control Structures
JavaScript provides various control structures to manage the flow of your code, such as:
- **If-Else Statements**: Used for conditional execution.
\`\`\`javascript
if (x > y) {
    console.log("x is greater than y");
} else {
    console.log("x is not greater than y");
}
\`\`\`
- **Loops**: Used for repeated execution of code blocks.
\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
\`\`\`

## Conclusion
These are just a few of the basics of JavaScript that you'll need to know to work with Zen. As you progress through the tutorial, you'll learn more about how to use JavaScript effectively in your musical creations. Happy coding!



`,I=`
# Streams

Streams are the way we organise our musical layers in Zen. Think of them as separate tracks in a music production software, each with their own instruments and effects.

Streams are stored in variables \`s0\`, \`s1\`, \`s2\`, and so on, up to \`s63\`. 

Each Stream is an \`object\`. When a Stream is triggered, it creates a musical event from all of its properties and sends it to the audio engine.
\`\`\`js
s0.inst.set("synth")
s0.n.set(60)
s0.amp.set(0.5)
s0.reverb.set(0.5)
s0.e.once()

// sends { inst: "synth", n: 60, amp: 0.5, reverb: 0.5 } to the audio engine
\`\`\`

You can also write the same thing more concisely using the \`set\` method with an \`object\`:
\`\`\`js
s0.set({inst: "synth", n: 60, amp: 0.5, reverb: 0.5})
s0.e.once()
\`\`\`

### Challenges
1. Create a Stream that plays a bass sound at note 40 with an amplitude of 0.7 and a reverb of 0.3.
2. Look up the documentation for the synth instrument and see what other properties you can set on a Stream.
3. Look up the documentation for the reverb, delay, and FX channel effects and try adding them to your Stream.
`,M=`
# Patterns

Patterns are the building blocks of Zen and are used to create sequences of values.

So far, we've passed single values to Stream properties, like this:
\`\`\`js
s0.n.set(60) // sets note to 60
s0.amp.set(0.5) // sets amplitude to 0.5
\`\`\`

However, we can also use Patterns to create sequences of values that change over time. 

For example, we can create a Pattern that cycles through a series of notes:
\`\`\`js
s0.set({inst: 'synth', amp: 0.5, cut: 0})
s0.n.seq([60, 62, 64, 65, 67])
s0.e.every(4)
\`\`\`

Or, we could create a Pattern that generates random values within a range:
\`\`\`js
s0.set({inst: 'synth', amp: 0.5, cut: 0})
s0.n.random(48, 72)
s0.e.every(2)
\`\`\`

We can use it to create rhythmic patterns as well. Try adding these to your code:
\`\`\`js
s0.e.rarely()
\`\`\`

\`\`\`js
s0.e.every(4).or(every(3))
\`\`\`

\`\`\`js
s0.e.random().gt(0.7)
\`\`\`

### Challenges
1. Create a Stream that plays a sequence of notes [55, 57, 59, 60] with a random amplitude and a reverb of 0.4.
2. Look at the documentation for the synth, add other properties and control with patterns.
3. Experiment with different Pattern types (like \`sine\`, \`tri\`, \`rand\`, etc.) to create interesting variations in your music.
`,Y="# Mini-notation\nInspired by [Tidal Cycles](https://tidalcycles.org/), Zen features a mini-notation for expressing patterns. Zen parses a mini-notation `strings` into an array, then selects the correct value based on the current time.\n\n## Basic syntax\nCreate an array of length 16 and fill with 1s:\n```js\ns0.e.set('1*16').print('e') // triggers on every division\n```\n\nCreate an array of length 16 and randomly fill it with 1s and 0s:\n```js\ns0.e.set('1?0*16').print('e')\n```\n\nCreate a sequence:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('1*16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.x.set('0..15?*16').print('x')\ns0.e.set('1*16')\n```\n\nAlternate between values:\n```js\ns0.x.set('0,1*2').print('x')\ns0.e.set('1*16')\n```\n\nAlternate between values:\n```js\ns0.x.set('0,0.25,0.5,0.75*4').print('x')\ns0.y.set('0,0.25,0.5,0.75*16').print('y')\ns0.e.set('1*16')\n```\n\nNotate bars:\n```js\ns0.x.set('0..15*16 | 15..0*16 |').print('x')\ns0.e.set('1*16')\n```\n\nRepeat bars:\n```js\ns0.x.set('0..15*16 |*2 15..0*16 |*3').print('x')\ns0.e.set('1*16')\n```\n\nStretch bars:\n```js\ns0.x.set('0..15*16 |^3').print('x')\ns0.e.set('1*16')\n```\n\nYou can repeat bars, then stretch them, but not the other way around:\n```js\ns0.x.set('0..15?*16 |*2^3').print('x')\ns0.e.set('1*16')\n```\n\n## Euclidean rhythms\n\n[Euclidean rhythms](https://en.wikipedia.org/wiki/Euclidean_rhythm) spread *x* beats over a *y* divisions, as equally as possible.\n\n4 pulses over 16 divisions:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('4:16')\n```\n\n3 pulses over 8 division:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('3:8')\n```\n\n3 over 8, twice per bar:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('3:8*2')\n```\n\n## Note values\nMidi note values are notated as `<root><octave>`, where the root is a capital letter and the octave is an number.\n```js\ns0.set({inst:0,reverb:0.5,cut:0,cutr:100})\ns0.n.set('C4 E4 G4 B4')\ns0.e.sometimes()\n```\n\n## Chords and scales\nChords and scales are handled identically. Both return an array of note values. Scales were gratefully adapted from Tidal Cycle's [scale library](https://github.com/tidalcycles/Tidal/blob/fcc4c5d53a72dcf2b8f4c00cc1c1b3c75eef172d/src/Sound/Tidal/Scales.hs#L4).\n\n### Chords\nChords are notated as `<root><triad><extension?>`, where the root is a capitalised letter, the triad is one of `ma`, `mi`, `di`, `au`, `su` (major, minor, diminished, augmented, suspended), and the (optional) extension is one of `6`, `7`, `#7`, `b9`, `9`, `11`, `#11`, `13`, `#13`:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7')\ns0.e.set('9:16')\n```\n\nTurn the chord into a sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7..*8')\ns0.e.set('9:16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7..?*16')\ns0.e.set('9:16')\n```\n\nSpecify the length of the chord:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7%16..*16')\ns0.e.set('1*16')\n```\n\nA number of Pattern methods handle arrays and can be useful here:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Cmi7').at(t())\ns0.e.set('1*16')\n```\n\n### Scales\nScales are notated `<root><scale>` and can be treated in the same way:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd*16')\ns0.e.set('3:8*2')\n```\n\nTurn the scale into a sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd..*16')\ns0.e.set('1*16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd..?*16')\ns0.e.set('1*16')\n```\n\nSpecify the length of the scale:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd%16..?*16')\ns0.e.set('1*16')\n```\n\nExecute `scales()` in the editor to print a list of available scales in the console.\n\n## Mini-notation can be used anywhere!\nMini-notation can be used in place of any value in Zen, making it enormously powerful. For example:\n```js\ns0.set({inst:0,reverb:'0.5?0*16',cut:'0?1*16',dur:10,r:100,vol:0.5})\ns0.n.set('Clyd%16..?*16')\ns0.e.set('1*16')\n```\n",H="\n# Instruments\n\nZen comes with a variety of built-in instruments. Run `instruments()` to see a list of available instruments. You can set the instrument of a Stream using the `inst` property:\n```js\ns0.set({inst: 'sampler'}) // use the name of the instrument\ns0.set({inst: 0}) // or use the index\n```\n\nFor a full list of instrument properties, see the help documentation (`cmd + h`)\n\n## Shared Properties\nAll instruments use the following properties:\n- `n`: note or frequency\n- `amp`: amplitude (volume)\n- `dur`: duration (in ms)\n- `cut`: cut other notes when a new note is triggered (index of stream)\n- `a`: attack time (in ms)\n- `d`: decay time (in ms)\n- `s`: sustain level (0 to 1)\n- `r`: release time (in ms)\n- `pan`: stereo panning (-1 to 1)\n\n## Synth\nThe `synth` instrument is a simple FM synthesizer. Here are some example settings:\n```js\ns0.set({inst: 'synth', cut: 0})\ns0.n.set('Ddor%16..*16')\ns0.modi.sine(0.5)\ns0.harm.random(0.5,11).step(0.5)\ns0.e.every(2)\n```\n\n## Sampler\nThe `sampler` instrument plays back audio samples. To see the available samples, run `samples()`.\n\nYou can load your own samples or use the built-in ones. Here are some example settings:\n\n```js\ns0.set({inst: 'sampler', bank: 'bd808', cut: 0})\ns0.n.set('Ddor%16..?*16')\ns0.i.random(0,16).step(1)\ns0.e.every(1)\n```\n\n## Granular\nThe `granular` instrument plays back audio samples using granular synthesis. Here are some example settings:\n```js\ns0.set({inst: 2, bank: 'breaks', snap: 16, dur:btms(4), cut: 0})\ns0.begin.saw(.25)\ns0.n.set('Ddor%16..?*16')\ns0.e.every(2)\n```\n",R=`
# Effects

Zen includes a number of high-quality effects and filters that can be applied to individual Streams or FX buses. The name of the effect sets the wet to dry level.

Applied directly to a Stream:
\`\`\`js
s0.set({inst: 0, reverb: 0.5, delay: 0.3})
s0.e.every(4)
\`\`\`

Applied to an FX bus (much more efficient):
\`\`\`js
s0.set({inst: 0, fx0: 0.5})
s0.e.every(4)

fx0.set({reverb: 0.7, delay: 0.4})
fx0.e.set(s0.e)
\`\`\`
`,B=`
# Mutations

Most live coding languages work a bit like MIDI sequencers. Once you've triggered an event (like a note or a pattern), it's set in stone. Zen is different. You can change (or mutate) any property of a Stream at any time, even after it's been triggered. This makes it easy to create evolving, dynamic music, and get Streams to interact with each other.

You can trigger a mutation using a Stream's \`.m\` property. Any properties prefixed with an underscore will morph to a new value. The time it takes to morph is determined by the Stream's \`lag\` property.

Try adding and removing an underscore to the \`n\`, \`modi\`, or \`harm\` properties in the example below:
\`\`\`js
s0.set({inst: 0, dur:btms(4), lag:1000, reverb:.5})
s0._n.random(36,72).step(1)
s0.modi.sine(.5,1,2)
s0.harm.noise(.25,1,11)
s0.e.every(16)
s0.m.every(8)
\`\`\`

You can also use mutations to create interactions between Streams. In the example below, we use s1's events to trigger s0's mutations:
\`\`\`js
s0.set({inst: 1, bank:'bd808'})
s0.cut.set(s2.e).ifelse(2, 0)
s0.n.set('Ddor%8..?*16')
s0.i.random(8,16,1).cache()
s0.e.every(16).or(rarely()).cache().and(not(s1.e))

s1.set({inst: 1, bank:'sd', cut:0, n: 74, e: '0 1'})

s2.set({inst: 0, dur:btms(4), lag:1000, reverb:.5, e: '1'})
s2._n.saw(1,38,72)
s2._modi.saw(1,0,10)
s2._harm.saw(1,1,10)
s2.m.use(s1.e)
\`\`\`
`,W=`
# Project 1: Beatslicer

In this project, we'll create a simple beatslicer using Zen. A beatslicer takes a drum loop and chops it into smaller segments that can be rearranged and manipulated in real-time.

## Basics

First, configure the stream to the sampler, load a drum break, and snap to the bpm grid:
\`\`\`js
// Set the tempo
z.bpm.set(160)

// Configure the stream
s0.set({inst: 'sampler',bank: 'breaks', dur: btms(4), snap: 16, cut: 0})
\`\`\`

Next, randomly select where to begin in the sample:
\`\`\`js
s0.begin.random().step(1/16) // random start point, stepping by 1/16th
\`\`\`

Finally, trigger the stream's events to play every 1/16th note:
\`\`\`js
s0.e.every(1) // trigger every 1/16th note
\`\`\`

## Extensions

Now that we have a basic beatslicer, let's add some variations.

Create some more interesting rhythms:
\`\`\`js
s0.e.every(3).or(every(4))
\`\`\`

And try a noise function rather than random:
\`\`\`js
s0.begin.noise().step(1/16)
\`\`\`

Make sure we get the kick drum at the start of each bar:
\`\`\`js
s0.begin
  .t(16)
  .eq(0)
  .ifelse(0, noise().step(1/16))
\`\`\`

Create some repetitions in how it slices the beat:
\`\`\`js
s0.begin.noise().step(1/16).cache()
\`\`\`

## Advanced
We can create a stutter effect by occasionally repeating the same slice:
\`\`\`js
s0.n.set(60).expand(rarely().ifelse(8,1))
s0.strum.btms(1/8)
\`\`\`

Add some detail by changing the amp and pan slightly for each stutter:
\`\`\`js
s0.amp.set(1).expand(8, (amp,i) => amp / (i+1))
s0.pan.set(0.5).expand(8, (p,i,a) => p + (1/a.length * i)).mod(1)
\`\`\`

## Conclusion

That's it! You've created a simple beatslicer using Zen. Experiment with different parameters and effects to make it your own.

Here's the whole code together:
\`\`\`js
z.bpm.set(150)

s0.set({inst: 'sampler',bank: 'breaks', dur: btms(4),snap: 16, cut: 0, strum: btms(1/8)})

s0.begin
  .t(16)
  .eq(0)
  .ifelse(0, noise().step(1/16))

s0.n.set(60).expand( rarely().ifelse(8, 1) )
s0.amp.set(1).expand(8, (amp,i) => amp / (i+1))
s0.pan.set(0.5).expand(8, (p,i,a) => p + (1/a.length * i)).mod(1)

s0.e.every(4).or(every(3))
\`\`\`

## Challenges

1. Try using different drum breaks from the 'breaks' bank, setting the \`i\` parameter to choose different samples.
2. Experiment with different slicing intervals (e.g., 1/8th, 1/32nd).
3. Add effects like reverb or delay to the beatslicer output.
4. Experiment with different rhythmic patterns on the \`s0.e\` event trigger.
`,z=`
# Project 2: Sequencing

In this project, we'll create a simple sequencer using Zen. A sequencer allows you to program a series of notes or events that can be played back in a loop, often with variations and effects.

## Basics

First, let's set up 3 streams: for kick, snare, and hi-hats. 
\`\`\`js
s0.set({inst: 'sampler', bank: 'bd'}) // kick

s1.set({inst: 'sampler', bank: 'sd808'}) // snare

s2.set({inst: 'sampler', bank: 'hh'}) // hi-hats
\`\`\`

Next, under each stream, we can write out longhand sequences for each instrument. For example:
\`\`\`js
let kpat = '1 0 0 1 0 1 0 0 | 1 0 0 1 0 0 0 1'
let spat = '0 0 1 0 0 0 1 0'
let hpat = '1 0 1 0 1 0 1 0 | 1 0 1 0 1 0 1 0'
s0.e.set(kpat)
s1.e.set(spat)
s2.e.set(hpat)
\`\`\`

Try playing around with the sequences to create your own beat.

## Extensions

Now that we have a basic sequencer, let's add some variations.

We can use randomization to create more dynamic rhythms. For example, we can randomly trigger the hi-hats:
\`\`\`js
s2.e.sometimes()
\`\`\`

We can add some occasional variations to the kick and snare patterns:
\`\`\`js
s0.e.set(kpat)
  .or(rarely())

s1.e.set(spat)
  .or(rarely())
\`\`\`

And we can get each layer to interact with each other. For example, let's ensure that the snare and hh only hit when the kick is not playing:
\`\`\`js
s1.e.set(spat)
  .or(rarely())
  .and(not(kpat))

s2.e.sometimes()
  .and(not(s1.e))
\`\`\`

Let's add some variation to the amplitude of each hit:
\`\`\`js
s0.amp.set(kpat).ifelse(1,0.25)
s1.amp.set(spat).ifelse(1,0.25)
\`\`\`

Finally, let's play around with the global time to create some fills:
\`\`\`js
let shouldFill = c(4).eq(3)

z.t.set(shouldFill).ifelse(
  noise(1,0,32).step(1),
  t()
)
\`\`\`

## Conclusion

That's it! You've created a simple sequencer using Zen. Experiment with different rhythms, variations, and interactions to make it your own.

Here's the whole code:
\`\`\`js
let shouldFill = c(4).eq(3)

z.t.set(shouldFill).ifelse(
  noise(1,0,32).step(1),
  t()
)

// kick
let kpat = '1 0 0 1 0 1 0 0 | 1 0 0 1 0 0 0 1'
s0.set({inst: 1, bank: 'bd'})
s0.amp.set(kpat).ifelse(1,0.25)
s0.e.set(kpat)
  .or(rarely())

// snare
let spat = '0 0 1 0 0 0 1 0'
s1.set({inst: 1, bank: 'sd808', cut: 0})
s1.amp.set(spat).ifelse(1,0.25)
s1.e.set(spat)
  .or(rarely())
  .and(not(kpat))

// hh
s2.set({inst: 1, bank: 'hh', cut: 0})
s2.e.sometimes()
  .and(not(s1.e)) 
\`\`\`

## Challenges
1. Try adding more instruments, like claps or percussion, using other streams.
2. Experiment with different rhythms.
3. Add effects like reverb or delay to individual streams.
4. Try creating more complex fills.
`,D=`
# Project 3: Harmony
In this project, we'll create a simple harmony generator using Zen. This project will demonstrate how to use streams and patterns to create harmonic progressions.

## Basics

First, let's store the global chord progression in a variable:
\`\`\`js
let harmony = 'Ddor%16 | Flyd%16 | Cmaj%16 | Aaeo%16'
\`\`\`

Next, let's set up a stream to the bass line:

\`\`\`js
s0.set({inst: 0, cut: 0})
s0.n.set(harmony).at(rarely().ifelse(4,0))
  .sub(24)
  .print()
s0.e.set('3:8')
\`\`\`

Chords:
\`\`\`js
s1.set({inst: 0, cut: 1})
s1.n.set(harmony).at([0,2,4]).sub(12)
s1.e.not(s0.e).and('4:8')
\`\`\`

Melody:
\`\`\`js
s2.set({inst: 0, cut: 2})
s2.n.set(harmony)
  .at(noise(1,0,8).step(even().ifelse(2,1)))
s2.e.noise().gt(.5)
  .and(coin())
  .cache()
\`\`\`

## Extensions

Let's get the chords to change inversions:
\`\`\`js
s1.n.set(harmony).at([0,2,4])
    .inversion(random(0,3).step(1))
\`\`\`

And get it to arpeggiate:
\`\`\`js
s1.strum.btms(1/4)
s1.e.every(2)
\`\`\`

## Conclusion

That's it! You've created a simple harmony generator using Zen. Experiment with different chord progressions, rhythms, and interactions to make it your own.

Here's the full code:
\`\`\`js
let harmony = 'Ddor%16 | Flyd%16 | Cmaj%16 | Aaeo%16'

s0.set({inst: 0, cut: 0})
s0.n.set(harmony).at(rarely().ifelse(4,0))
  .sub(24)
  .print()
s0.e.set('3:8')

s1.set({inst: 0, cut: 1})
s1.n.set(harmony).at([0,2,4]).sub(12)
  .inversion(random(0,3).step(1))
s1.strum.rarely().ifelse(btms(1/4), 0)
s1.e.not(s0.e).and('4:8')

s2.set({inst: 0, cut: 2})
s2.n.set(harmony)
  .at(noise(1,0,8).step(even().ifelse(2,1)))
s2.e.noise().gt(.5)
  .and(coin())
  .cache()
\`\`\`

## Challenges
1. Try using different scales or modes for the harmony.
2. Experiment with different rhythms for each stream.
3. Add effects like reverb or delay to individual streams.
4. Create variations in the melody based on the chord being played.
5. Combine project 1 and 2 to create a full track with beats and harmony.
`,J=`
# Project 4: Text to Music

In this project, we'll create a simple text-to-music generator using Zen. This project will demonstrate how to convert text input into musical notes and rhythms.

## Basics
First, we'll decide on some text:
\`\`\`js
// https://randomwordgenerator.com/sentence.php
let words = 'Combines are no longer just for farms'
\`\`\`

Next, we'll use Zen's inbuilt function to convert characters to different types of values;:
\`\`\`js
s0.set({inst: 0, cut: 0})
s0.n.textToMidi('hello world')
s0.e.textToRhythm('hello plymouth')
\`\`\`

## Extensions
Here's a more complete example that uses text to generate both a bassline and a drum pattern, combining the beatslicer techniques from Project 1 with note generation:

\`\`\`
z.bpm.set(170)

let harmony = 'Dmpent%8 | Fmpent%8'

// https://randomwordgenerator.com/sentence.php
let words = 'What’s it going to be then, eh?'

s0.set({
  inst: 'acid',
  res: noise(), 
  cutoff: noise().mul(5000)
})
s0.n.textToMidi(words)
  .snap(harmony)
  .sub($(s1.begin).mul(q()).odd().ie(12,36))
s0.e.set(s1.e)

s1.set({
  inst: 'sampler',
  bank: 'breaks',
  dur: btms(4),
  snap: 16,
  cut: [1,0],
  i: 0,
})
s1.begin.mod(32).ie(noise().step(1/16).cache())
s1.e.every(16)
  .or(textToRhythm(words))
  .and(even())
\`\`\`
`,N={intro:E,javascript_basics:P,streams:I,patterns:M,instruments:H,effects:R,mini_notation:Y,mutations:B,project_1_beatslicer:W,project_2_sequencing:z,project_3_harmony:D,project_4_text_to_music:J},L=Object.entries(N).map(([a,t])=>({title:F(a),slug:q(a),markdown:t}));var O=c('<meta name="description" content="A tutorial on how to use Zen, for total beginners."/>'),G=c('<li class="svelte-yrycp"> <a class="chapter svelte-yrycp"> </a></li>'),X=c('<section class="content svelte-yrycp"><div class="content__inner svelte-yrycp"><h1>Tutorial</h1> <nav><ul class="svelte-yrycp"></ul></nav></div></section>');function ae(a){var t=X();j(r=>{var n=O();x.title="Zen | Tutorial",l(r,n)});var h=s(t),m=p(s(h),2),d=s(m);C(d,5,()=>L,T,(r,n,f)=>{let g=()=>y(n).slug,b=()=>y(n).title;var o=G(),u=s(o);u.nodeValue=`${f+1}. `;var i=p(u),v=s(i,!0);e(i),e(o),k(()=>{_(i,"href","/tutorial/"+g()),S(v,b())}),l(r,o)}),e(d),e(m),e(h),e(t),l(a,t)}export{ae as component,se as universal};
