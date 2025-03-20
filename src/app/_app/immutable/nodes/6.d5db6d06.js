import{d as M}from"../chunks/environment.9aa685ef.js";import{S as D,i as U,s as E,k as d,a as z,q as Z,_ as L,l as p,h as i,c as I,m as b,r as A,n as y,D as c,b as k,N as j,U as R}from"../chunks/index.64203393.js";import{f as Y,a as G}from"../chunks/utils.ae7ad10d.js";const O=M,W=!0,de=Object.freeze(Object.defineProperty({__proto__:null,csr:O,prerender:W},Symbol.toStringTag,{value:"Module"})),B=`# Intro
Welcome to Zen, a tool for composing music in the browser using quantum algorithms. In Zen, you can design quantum circuits, and generate complex musical patterns using a simple JavaScript API. It comes with a number of high-quality instruments and effects - including synths, samplers, delay and reverb - and can be integrated into your existing studio through MIDI.

This is a tutorial to help you get started. It's not meant to be comprehensive, but it should give you a good idea of how to use ZenQ. For more information, check out the reference documentation. We recommend that you open the code editor in a separate tab so that you can see and hear the patterns in the examples that follow.

Zen will work in most browsers but, for best performance, we recommend Google Chrome.

Enjoy!
`,Q=`# Getting Started
Before we get into Zen’s nuts and bolts, simply copy the following example into the editor and press shift + enter. Change some values, comment out a few lines and see if you can work out what each part does. When you’ve finished, press esc to stop playback.

// TODO
`,X=`# The Editor
On the left of the user interface is the code editor and, below this, the console: for logging errors and getting information. On the right, you can toggle through different combinations of the pattern visualiser and the quantum circuit schematic, using the icons in the lower toolbar.

In the toolbar, there also are controls for play/stop, save and load.

Editor commands:
- \`shift+enter\` executes the code and starts playback
- \`esc\` stops playback.
- \`cmd+o\` opens a list of presets and saved files
- \`cmd+s\` saves your code
`,H="# Streams\nZen is organised into Streams, which refer to different musical layers. Streams are represented by the letter `s` and an index, as in `s0`, `s1`, `s2` ... `s63`. Think of them as separate tracks on a mixing desk, each track with its own instruments and effects. A Stream is an instance of a [Stream class](/docs/classes#stream). The methods and properties you’ll use the most are:\n- `.set()`\n- `.p`\n- `.e`\n\n## .set()\nThe `.set()` method is used to set parameters that remain constant. It accepts an object literal: a list of key/value pairs. For example, `s0.set({inst:’synth’,vol:0.5})` tells stream 0 to use the synth instrument at half volume. \n\n## .p\nThe `.p` property is used to set parameters that should change over time. These are written, for example, as `s0.p.vol`, or `s0.p.amp`, or even `s0.p.banana`. Zen doesn’t care what parameter names you use here, invalid parameters are simply ignored by the synth engine. All parameters are instances of the [Pattern class](/docs/classes#pattern), covered in the previous chapter.\n\nHere’s an example of setting parameters using the `.p` property:\n```js\ns0.set({inst:0,cut:0,mods:0.1,reverb:0.5})\ns0.p.n.saw(0,32,2).add(48)\ns0.p.modi.sine(0,4,0,0.5)\ns0.p.harm.tri(1,2)\ns0.p.pan.noise()\ns0.e.set(1)\n```\n\n## .e\n`.e` stands for event and is used to trigger the stream. It is also an instance of a Pattern. If `.e` is set to 0 no event is triggered. If `.e` is greater than 0, an event is triggered. Consequently, there are many Pattern methods that simply return 1s and 0s.\n\nHere are some different ways you could trigger a stream. Try replacing the final line of the previous example with one of the following:\n```js\ns0.e.every(4)\n```\n\n```js\ns0.e.every(4).or($every(3))\n```\n\n```js\ns0.e.sine(0,1).step(1)\n```\n\n```js\ns0.e.set('1?0*16')\n```\n\n```js\ns0.e.set('3:8*2')\n```\n\n## Additional Features\nA few extras before moving on. If you're just trying to get a sense of what Zen can do, you can skip this section for now.\n\n### Cut\nCut is a special parameter that allows you to cut active events in any stream short. It accepts an integer or array of integers which reference the index of a stream. For example, `s0.set({cut:1})` will cut any active events in stream 0 short. `s0.set({cut:[1,2]})` will cut any active events in streams 1 and 2 short. By default, cut fades out the event over 5ms. You can set the fade time using the `cutr` parameter. For example, `s0.set({cut:1,cutr:500})` will cut any active events in stream 0 short over 500ms. \n\n### Solo and Mute\nSolo and mute are both instances of a Pattern. They are used to solo or mute a stream. For example, `s0.solo.set(1)` will solo stream 0. `s0.mute.set(1)` will mute stream 0.\n\nThey can be patterned in the usual way, for example, `s0.solo.set('1?0*16')` will randomly solo stream 0. \n\n### Level\nLevel is a special parameter that allows you to control the level of the track used by the Stream. It accepts a float between 0 and 1. For example, `s0.set({level:0.5})` will set the level of stream 0 to 0.5. Think of it as the fader on a mixing desk channel strip.\n\n### I\nUse `s0.i` to access the index of the Stream. This is useful when you want to reference the Stream elsewhere:\n```js\nlet kick = s0\nlet snare = s1\n\nkick.set({inst:1,cut:snare.i})\nsnare.set({inst:2,cut:kick.i})\n```\n\n### Track\nBy default, each Stream sits on its own track, controlling a separate channel strip containing instruments and fx. These are created as you use them, meaning most tracks, and their associated instruments and fx, are dormant. As soon as you use more than 8 streams, particularly if you use reverb on each, things get a little expensive, especially when running Zen in the browser. To save on CPU, you can point multiple Streams at the same track, using the `track` parameter. For example, `s0.set({track:0})` and `s1.set({track:0})` will both play on track 0, sharing their instruments and fx.\n\nListen to the following example then comment out the track parameter:\n```js\nz.set({\n  in:0,dur:ms(4),re:0.5,rde:0.5,v:1,r:1000,co:1000,res:0.1,ra:1,\n  track:0, // comment out this line to hear the difference\n});\n  \n[s0,s1,s2,s3,s4,s5,s6,s7].map(s => {\n  s.set({vol:0.25})\n  s.p._n.set('Clyd%16..?*16')\n  s.p._harm.saw(0.5,1.5,0.25)\n  s.e.set('1*16')\n  s.m.set('1*16')\n})\n```\nWithout the track parameter, we hear 8 synths with 8 reverbs. With the track parameter set to the same value, all streams control the same synth and reverb, saving on CPU.\n",$='# Patterns\nThe [Pattern class](/docs/classes#pattern) is Zen\'s primary building block. As we shall see, in Zen *everything is a pattern*. Once you have mastered patterns, you have mastered Zen. Run the following code in the editor:\n```js\ns0.x.saw()\ns0.e.every(1)\n```\n`s0`, or `s1`, `s2`, `s3` etc., are instances of the [Stream class](/docs/classes#stream), which we will cover in the next chapter. A stream\'s `.x` and `.e` properties are both patterns. `.x` controls the x position of the stream on the canvas and expects values between 1 and 0. `.e` determines when a stream should trigger an event and expects patterns of 1s or 0s. 1s fires an event, 0s are ignored.\n\nPatterns have many useful methods for generating interesting streams of values. The `.set()` method is used to set a constant value, whereas `every()` returns a 1 every n divisions. For example:\n```js\ns0.x.set(0.5)\ns0.e.every(4)\n```\n\nMethods such as `.sine()`, `.tri()`, and `.square()` return changing values that depend on the current time. By default, most methods return normalised values, but you can pass additional arguments to determine how their output should be scaled. This example returns values between 0 and 0.5, at a frequency of 2 cycles per bar:\n```js\ns0.x.sine(0,0.5,2)\n```\n\nPattern methods can be chained:\n```js\ns0.x.sine(0.5,1) // this is the same...\ns0.x.sine().mul(0.5).add(0.5) // ...as this\n```\n\nPattern arguments don\'t have to be constant. You can pass other patterns as arguments, which allows for complex patterns to be built from simpler ones. For example:\n```js\ns0.x.sine() // move the stream left and right with a sine wave\ns0.y.saw(s0.x,1) // move the stream up and down with a saw wave, scales by the x position\ns0.e.set(s0.x).gt(0.5) // trigger an event when the x position is greater than 0.5\n```\n\nAll Pattern methods exist in the global scope, prefixed by $, allowing you to spawn new Patterns. For example:\n```js\ns0.x.sine($saw().mul($noise()),1)\ns0.e.set(1)\n```\n\nYou can also use a [mini-notation](/learn/mini-notation) string to create patterns. For example:\n```js\ns0.x.set("0 0.25 0.5 0.75")\ns0.y.saw(0,1,4)\ns0.e.set("1*4 0*4 1*4 0*4")\n```\n\nFor a full list of Pattern methods and their arguments, see the [Pattern docs](/docs/classes#pattern).\n',N="# Mini-notation\nInspired by the [Tidal Cycles](https://tidalcycles.org/) pattern language, and guided by this [excellent tutorial](http://alicelab.world/workshop_nime_2017/) from the writers of [Gibber](https://gibber.cc/), Zen includes a mini-notation for expressing patterns. Under the hood, Zen parses this mini-language into arrays of values, then uses the current time to get the right value.\n\n## Basic syntax\nCreate an array of length 16, fill with 1s, then use it to trigger a stream:\n```js\ns0.e.set('1*16') // triggers on every division\n```\n\nCreate an array of length 16 and randomly fill it with 1s and 0s:\n```js\ns0.e.set('1?0*16') // trigger randomly, but repeat the pattern every bar\n```\n\nCreate a sequence of values:\n```js\ns0.x.set('0..15*16').div(16)\ns0.e.set('1*16')\n```\n\nRandomly choose from a sequence:\n```js\ns0.x.set('0..15?*16').div(16)\ns0.e.set('1*16')\n```\n\nAlternate between values:\n```js\ns0.x.set('0,0.5*2')\ns0.e.set('1*16')\n```\n\nAlternate between values:\n```js\ns0.x.set('0,0.25,0.5,0.75*4')\ns0.y.set('0,0.25,0.5,0.75*16')\ns0.e.set('1*16')\n```\n\nNotate bars:\n```js\ns0.x.set('0..15*16 | 15..0*16 |').div(16)\ns0.e.set('1*16')\n```\n\nRepeat bars:\n```js\ns0.x.set('0..15*16 |*2 15..0*16 |*3').div(16)\ns0.e.set('1*16')\n```\n\nStretch bars:\n```js\ns0.x.set('0..15*16 |^3')\ns0.e.set('1*16')\n```\n\nYou can repeat bars, then stretch them, but not the other way around:\n```js\ns0.x.set('0..15?*16 |*2^3')\ns0.e.set('1*16')\n```\n\n## Euclidean rhythms\n\n[Euclidean rhythms](https://en.wikipedia.org/wiki/Euclidean_rhythm) are created by spreading beats over a given number of divisions, as equally as possible.\n\n4 pulses over 16 divisions:\n```js\ns0.x.set('0..15*16')\ns0.e.set('4:16')\n```\n\n3 pulses over 8 division:\n```js\ns0.x.set('0..15*16')\ns0.e.set('3:8')\n```\n\n3 over 8, twice per bar:\n```js\ns0.x.set('0..15*16')\ns0.e.set('3:8*2')\n```\n\n## Note values\nMidi note values are notated as `<root><octave>`, where the root is a capital letter and the octave is an integer.\n```js\ns0.set({in:0,reverb:0.5,cut:0,cutr:100})\ns0.x.set('0..15?*16 |*4').div(16)\ns0.p.n.set(s0.x).set('C4 E4 G4 B4') // use the x position to control the note number\ns0.e.set('9:16')\n```\n\n## Chords and scales\nChords and scales both return an array of note values. Scales were adapted from Tidal Cycle's [scale library](https://github.com/tidalcycles/Tidal/blob/fcc4c5d53a72dcf2b8f4c00cc1c1b3c75eef172d/src/Sound/Tidal/Scales.hs#L4). Many thanks!\n\nChords are notated as `<root><triad><extension?>`, where the root is a capitalised letter, the triad is one of `ma`, `mi`, `di`, `au`, `su` (major, minor, diminished, augmented, suspended), and the (optional) extension is one of `6`, `7`, `#7`, `b9`, `9`, `11`, `#11`, `13`, `#13`:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.p.n.set('Cmi7')\ns0.e.set('9:16')\n```\n\nTurn the chord into a sequence:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.p.n.set('Cmi7..*8')\ns0.e.set('9:16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.p.n.set('Cmi7..?*16')\ns0.e.set('9:16')\n```\n\nSpecify the length of the chord:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.p.n.set('Cmi7%8..*16')\ns0.e.set('1*16')\n```\n\nA number of Pattern methods handle arrays and can be useful here:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100,v:0.5})\ns0.p.n.set('Cmi7*16').inv('0..8?*16|*4')\ns0.e.set('1*16')\n```\n\nScales are notated <root><scale> and can be treated in the same way:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100,v:0.5})\ns0.p.n.set('Clyd*16')\ns0.e.set('1 1 1 1')\n```\n\nTurn the scale into a sequence:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100,v:0.5})\ns0.p.n.set('Clyd..*16')\ns0.e.set('1*16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100,v:0.5})\ns0.p.n.set('Clyd..?*16')\ns0.e.set('1*16')\n```\n\nSpecify the length of the scale:\n```js\ns0.set({in:0,reverb:0.5,cut:0,dur:10,r:100,v:0.5})\ns0.p.n.set('Clyd%16..?*16')\ns0.e.set('1*16')\n```\n\nExecute `scales()` in the editor to print a list of available scales in the console.\n\n## Mini-notation can be used anywhere!\nMini-notation can be used in place of any value in Zen, making it enormously powerful. For example:\n```js\ns0.set({in:0,reverb:'0.5?0*16',cut:'0?1*16',dur:10,r:100,v:0.5})\ns0.p.n.set('Clyd%16..?*16')\ns0.e.set('1*16')\n```\n",V="# Mutations\nZen allows you to modulate the parameters of all active events within a stream. The `.m` parameter stands for mutation and is an instance of the [Pattern class](/docs/classes#pattern). As with events, when the Pattern returns a value greater than 0, a mutation is triggered. Parameters to be mutated should be prefixed with `_`.\n```js\ns0.set({inst:'synth',cut:0,re:0.25,rdecay:0.75,de:0.25,lag:ms(2),locut:0.3,vol:0.5})\ns0.p._n.set('Dpro%16..?*16|*4').sub('0?12*16')\ns0.e.every('1?2*16')\ns0.m.not(s0.e)\n```\nIn the example above, try adding and removing the `_` prefix from the n parameter and comparing the two patterns. \n\nFinally, the `lag` parameter determines how many milliseconds it should take for a mutation to modulate from one parameter to the next. This can be useful for creating smooth transitions between values.\n",J=`# Custom Samples
There are a number of ways to load your own samples in Zen. 

## loadSamples()
The \`loadSamples()\` function allows you to load samples that are publicly availble via a URL. It takes two arguments:
* an object whose keys are the name of the sample banks and whose values are the arrays of sample URLs
* an optional base URL to prepend to each sample URL
\`\`\`js
loadSamples({
  test: [
    'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/808bd/BD0000.WAV'
  ]
})

s0.set({inst:1,bank:'test'})
s0.e.every(2)
\`\`\`

## localhost:6060
Zen fetches samples via HTTP requests, looking for additional, locally served files on localhost:6060. To serve your own samples, download and install this [simple package](https://github.com/cephasteom/zen-connect). Follow the instructions in the README.md and refresh Zen. Your custom samples should be listed in the console when you run the command \`samples()\`.
`,K=`# Instruments
Zen has an internal synth engine, with a range of high-quality instruments and effects, all within your browser. Full documentation for instruments and effects can be found in the docs. This chapter gives a flavour of what’s possible.

## Generic Parameters
Most instruments share a common set of parameters. Envelope parameters are \`a\` (attack), \`d\` (decay), \`s\` (sustain), \`r\` (release). The \`dur\` parameter controls the duration of the note, the \`amp\` parameter controls the amplitude of the note, and the \`vol\` parameter controls the overall volume of the instrument. \`lag\` determines the time in ms it takes for a stream to mutate (see [mutations](/learn/mutations)), whilst \`nudge\` allows you to delay a stream's events by a given amount of time (in ms).

## Synth
An all purpose synth with filters and FM:
\`\`\`js
s0.set({inst:'synth',cut:0,re:0.25,rdecay:0.75,de:0.25,lag:ms(2),locut:0.3})

s0.x.saw()
s0.y.noise()

s0.p.n.set('Dpro%16..?*16|*4').sub(12)
s0.p.mods.random(0.1,1,0.5)
s0.p.dur.noise(0.1,2,0.75).btms()
s0.p._modi.set(s0.x).saw(0.25,0.5)
s0.p._harm.set(s0.y).saw(0.5,3,0.25)

s0.e.every('1?2*16')
s0.m.not(s0.e)
\`\`\`

## Sampler
The sampler takes the name of a sample bank and the index of a file within that directory. To print a list of available sample banks, type \`samples()\` into the editor. See the chapter on [Custom Samples](/learn/custom-samples) to load your own.
\`\`\`js
z.bpm.set(160)

s0.set({inst:1,bank:'breaks',snap:16,dur:ms(1),cut:[0,1,2]})
s0.e.set('1')

s1.set({inst:1,ba:'breaks',snap:16,cut:[0,1],dur:ms(8),loop:1,cutr:ms(0.5),re:0.125,rs:0.1})
s1.x.saw(0,1,1/4)
s1.p.begin.set(s1.x).saw().step(1/8)
s1.p.i.v('0|*3 1')
s1.e.not(s0.e).and($every(16))
\`\`\`

## Granular Synth
Similar to the sampler, the granular synth expects a sample bank and index. Granular synthesis allows you to treat pitch \`n\` and playback speed \`rate\` separately.
\`\`\`js
z.bpm.set(160)

s0.set({inst:'granular',bank:'cpu2',i:2,snap:q,dur:ms(8),cut:[0,1,2],rate:0.5,lag:ms(1/4),vol:0.5,reverb:1,locut:0.25})
s0.p._n.sine(60,72,0,0.25)
s0.p._i.random(0,16,1)
s0.e.set('1|0')
s0.m.every(1)
\`\`\`
`,ee=`# The Canvas
So far we’ve mapped all parameters across time using the \`.p\` property. In Zen, you can use the x, y, and z position of each stream to maps parameters across space, allowing you to compose in 4 dimensions.

## .x .y .z
The \`.x\`, \`.y\`, and \`.z\` properties of a stream allow you to move a stream around a virtual space and are all instances of the [Pattern class](/docs/classes#pattern). This movement is represented in 2 dimensions (xy) on the visualiser using the concept of a sphere. We have chosen to use the x axis as the horizontal rotation of the sphere, the y axis as the vertical rotation.
\`\`\`js
s0.e.every(1)
s0.x.saw()
s0.y.noise()
\`\`\`

## Using .x .y .z
When you use the \`.p\` property, the current time is passed as the first value to your chain of methods. You can replace this with the position of a stream:
\`\`\`js
s0.set({inst:0,cut:0,re:0.5})

s0.x.saw() // set the stream's x position
s0.y.noise() // set the stream's y position

s0.p.n.set(s0.x).set('Dlyd%12..*16') // map the note number pattern across time
s0.p.modi.set(s0.x).saw(1,10) // map the modulation index pattern over the x axis
s0.p.harm.set(s0.y).saw(0.5,3,0.25) // map the harmonicity ratio over the y axis

s0.e.every(1)
\`\`\`

The canvas can be used or ignored at will. However, composing with four dimensions can be a useful way of managing complexity. For example, you could place the overall intensity of the piece on the z axis, and use the x and y axes to control the movement of individual streams.

As we shall see, plotting a stream's position in 3D space comes into its own when you start using Zen's quantum features.

## Grid
Alternatively, you can overwrite the stream positions on the canvas using \`z.grid\`. This is an instance of the Pattern class and expects an array of values between 0 and 1. Using the length of the array as the size of the grid, it will visualise the data that you send. For example:
\`\`\`js
z.grid.set(() => Array.from({length: 16*16}, () => Math.random()))
\`\`\`

If you want to determine the width and height of the grid, you can pass a 2D array:
\`\`\`js
z.grid.set(() => Array.from({length: 16}, () => Array.from({length: 16}, () => Math.random())))
\`\`\`

Whilst this has no bearing on the sound, you can sonify this data elsewhere in your code. Potential uses are for cellular automata. The \`.persist()\` pattern method can be used to modify the grid over time, allowing you to create evolving patterns. 

Here's an example of the famous Game of Life:
\`\`\`js
// Create a new grid
const create = size => Array(size).fill()
  .map(() => Array(size).fill()
  .map(() => Math.floor(Math.random() * 2)));

// Count the neighbours of a cell
const count = (grid, x, y) => [-1, 0, 1].flatMap(dx =>
    [-1, 0, 1].map(dy => {
      if (dx == 0 && dy == 0) return 0;
      const newX = (x + dx + z.s) % z.s;
      const newY = (y + dy + z.s) % z.s;
      return grid[newX][newY] ? 1 : 0;
    })
  ).reduce((a, b) => a + b);

// determine next state of cell
const shouldLive = (cell, neighbours) => (cell 
  ? neighbours == 2 || neighbours == 3 
  : neighbours == 3)
    ? 1
    : 0;

// generate next state of grid
const next = grid => grid.map((row, x) =>
  row.map((cell, y) => 
    shouldLive(cell, count(grid, x, y))
  ));

// use the persist method to change previous iteration
z.grid.persist((_, last) => {
  const grid = last ? last : create(z.s);
  return next(grid);
});
\`\`\`
`,te=`# MIDI
Midi is simple to use in Zen. On page load, all available midi inputs and outputs are printed in your console for reference. The index of the device you wish to use should be assigned to a stream's \`midi\` parameter.

## MIDI Output
The following parameters control midi routing in Zen:

- \`midi\` the midi device to send messages to (passed as an index).
- \`midichan\` the midi channel to send messages to. Sends to all channels if not included.
- \`mididelay\` delay midi messages (ms). Useful for synchronising midi and audio.
- \`cc<number>\`, as in \`cc1\`, \`cc2\` etc. Send control change messages. CC values are normalised (0 - 1).

For example:
\`\`\`js
// send midi notes to device 1, channel 1
s0.set({ midi: 1, midichan: 1 })
s0.p.n.set('60 62 64 65 67 69 71 72')
s0.e.every(2)
// send cc messages
s0.p.cc1.sine()
\`\`\`

## MIDI Input
Patterns can also use midi control changes and currently pressed keys as input. The following methods are available:
\`\`\`js
// use the modulation wheel on device 10 as input, with an initial value of 0.5
s0.p.vol.midicc(1,10,0.5)
// use all pressed keys on device 10 as input
s0.p.n.midinote(10)
\`\`\`

## MIDI Parsing
Zen can parse midi files and extract note and event data:
\`\`\`js
let bassfile = 'http://localhost:6060/midi/tune03/tune03-bass.mid' // must be hosted somewhere accessible

s0.set({inst: 0, cut:0})
s0.p.n.midifile(bassfile, 'n') // use the note data
s0.e.midifile(bassfile, 'e') // use the event data
\`\``,se=`# Global Settings

## BPM, time and space
Global settings can be set using the \`z\` object, an instance of the [Zen class](/docs/classes#zen). 
- \`z.bpm\` sets the tempo of the piece in beats per minute. It is an instance of the [Pattern class](/docs/classes#pattern).
- \`z.t\` sets the global time of the piece. It is an instance of the [Pattern class](/docs/classes#pattern).
- \`z.q\` sets the the amount of divisions per cycle. In other words, how many times your code evaluates per bar.

Run the code below whilst watching the pattern visualiser to see how these parameters affect the canvas.

\`\`\`js
z.bpm.set(120)
z.t.sine(0,16,10.25)
z.q = 16
\`\`\`

## Global parameters
You can set instrument and fx parameters in the same way that you set them on a stream, using \`z.set()\` and \`z.p\`. Parameters set on the global \`z\` object will be passed down to all streams.
\`\`\`js
z.set({reverb: 1, cut:[0,1]}) // set reverb to 0.5 on all streams
z.p.n.set('Clyd%16..*16') // use a lydian scale on all streams

s0.set({inst: 0})
s0.e.set(1)

s1.set({inst: 0, reverb: 0}) // override global reverb setting
s1.p.n.add(12) // you can chain further methods to the pattern set on the z object
s1.e.set(1)
\`\`\`

## Seeding randomness
You can seed the random number generator using \`z.seed\`, allowing you to use randomness with repeatable results. Seed is an instance of a pattern, so you can use any pattern method to set it, for example \`z.seed.set(256)\`.

## Swing
Swing can be set globally using the \`z.swing\` property. Swing is a value between 0 and 1, with 0 being no swing and 1 being full swing. Swing is applied to all streams. Swing is an instance of the [Pattern class](/docs/classes#pattern).

Additionally, set the subdivision to swing using the \`z.swingn\` property. This is an instance of the [Pattern class](/docs/classes#pattern).
\`\`\`js
z.swing.set(0.25)
z.swingn.set(16) // swing 16th notes
\`\`\`
`,ae="# Utilities\nThere are a number of utility functions useful for controlling Zen.\n\n- `clear()` clears the console\n- `scales()` show all scales that can be used in the mini-notation\n- `chords()` show all chords that can be used in the mini-notation\n- `samples()` show all samples that are available to use\n- `midi()` show all available midi devices\n- `seed(<string>)` seed the random numbers used in Pattern and in the mini-notation. \n- `btms()` converts a number of beats to milliseconds, based on the current tempo.\n- `exportCircuit(<format>)` prints the current circuit to the console as a string. Formats are 'qasm' or 'qiskit'. Default is 'qasm'.\n",ne=`# FX
Zen has an internal synth engine, with a range of high-quality effects, all within your browser. Full documentation for effects can be found in the docs.

## Track FX and FX Streams

Track FX are applied to the output of a track. By default, each stream is routed to its own track, with \`s0\` using track 0 (channels 1 and 2), \`s1\` using track 1 (channels 3 and 4), and so on. You can change the track a stream is routed to by setting the \`track\` parameter. Each track has a chain of effects attached to it, including reverb, delay, distortion and high and low cut filters. For efficiency, these are only instantiated when you use them, so you might hear a small glitch whilst they are being created.
\`\`\`js
s0.set({inst:'synth',cut:0,reverb:0.5,rtail:0.5,de:0.25,lag:ms(2),locut:0.3,vol:0.5})
s0.p._n.set('Dpro%16..?*16|*4').sub('0?12*16')
s0.e.every('1?2*16')
s0.m.not(s0.e)
\`\`\`

Of course, using separate reverbs, delays, etc. for every track is expensive and may have performance implications, depending on your machine. FX Streams are separate streams for controlling your effects and can be thought of as an effects bus on your mixing desk. FX streams are represented by the variables \`fx0\`, \`fx1\`, etc. Route a stream to an FX stream using the variable name as a parameter. The following example routes \`s0\` to \`fx0\`:
\`\`\`js
s0.set({
    inst:'synth',cut:0,lag:ms(2),locut:0.3,vol:0.5,
    fx0:0.5 // send half of the signal to the fx bus
})
s0.p._n.set('Dpro%16..?*16|*4').sub('0?12*16')
s0.e.every('1?2*16')
s0.m.not(s0.e)

fx0.set({reverb:1,rsize:0.5})
fx0.p.rtail.saw(0,1,0,1/4)
fx0.e.every(1) // you still need to trigger events on an fx stream
\`\`\`
`,oe=`# Zen Quantum
Zen is a quantum computer music programming language. It contains an integration of the [Quantum Circuit library](https://www.npmjs.com/package/quantum-circuit) developed by Quantastica to facilitate the design and execution of (simulated) quantum circuits, from the comfort of your web browser. 

Switch on the circuit view by clicking the burger menu in the bottom right of the screen. Circuits are built by chaining gates to virtual wires. Each wire represents a qubit, the fundamental unit of quantum information. In Zen, qubits are represented by a "q", and an integer, as in \`q0\`, \`q1\`, \`q2\`, etc. Gates are added by chaining methods to each qubit.
\`\`\`js
q0.h().cx(1).cx(1,4).h()
q1.cx(2,2).cx(2,3)
q2.cx(3,3).cx(3,2)
q3.cx(4,4).cx(4,1)
q4.cx(5,5)
\`\`\`

Gate parameters can be passed as raw values, [mini-notation](/learn/mini-notation), or [Patterns](/learn/patterns).
\`\`\`js
q0.rx('1?0*16')
q1.rx(saw().step(0.25))
\`\`\`

The outcomes of circuit executions, encompassing the state vector, individual qubit measurements, basis states, probabilities, and amplitude coefficients, can serve as data to be sonified within your Zen code. In the remainder of this section, we explain how to construct quantum circuits within Zen, and how to access the available quantum data within your compositions. For a more detailed explanation of quantum computer music, see [Miranda (2022)](https://link.springer.com/book/10.1007/978-3-031-13909-3).

Run the following example to get a feel for quantum programming in Zen:
\`\`\`js
q0.h().cx([1]).ccx([1,2])
q1.fb(0)
q2.fb(1)

s0.e.qm(0, 32)
s1.e.qm(1, 32)
s2.e.qm(2, 32)

s0.set({inst: 1, bank: 'bd808', i: 3, cut: 0})
s1.set({inst: 1, bank: 'sd808', i: '0..1?*16', cut: [0,1]})
s2.set({inst: 1, bank: 'hh', i: '0..16?*16', cut: [0,2], vol: 0.5})
\`\`\`

## Gates
All of the gates implemented in Zen can be found in the [Quantum Circuit library](https://www.npmjs.com/package/quantum-circuit) and, in each case, use the short name as the name of the method.

## Multi-qubit gates
Multi-qubit gates are used to entangle qubits. They connect one or more control qubits to a target qubit. A gate will be applied to the target qubit only if the state(s) of the control qubit(s) meet certain conditions. In Zen, the wire that the gate is appended to is always the control qubit. Additional qubits are passed as the first argument as an index or array of indexes. For example, to apply a CNOT, or CX, gate to qubits 0 and 1:
\`\`\`js
q0.cx(1)
\`\`\`
Here, the control qubit is 0 and the target qubit is 1. Qubit 1 has an X gate applied only if qubit 0 is in the state |1⟩.

To apply a CCNOT, or CCX, gate to qubits 0, 1 and 2:
\`\`\`js
q0.ccx([1,2])
\`\`\`
Here, the control qubits are 0 and 1, and the target qubit is 2. Qubit 2 has an X gate applied only if qubit 0 and qubit 1 are in the state |1⟩.

### Gate parameters
Some gates require additional parameters. For example, the U3 gate expects theta, phi, and lambda angles passed as an array. For example, to apply a U3 gate to qubit 0:
\`\`\`js
q0.u3([0.1,0.2,0.3])
\`\`\`
Parameters are always normalised (between 0 and 1). In the case of the theta angle, this translates to π. For phi and lambda, 2π. Values can be numbers, [mini-notation](/learn/mini-notation), or [Patterns](/learn/patterns). The following will work:
\`\`\`js
s0.x.sine()
q0.u3([0.5,'0.25?0.5?0.75?1*16',s0.x])
\`\`\`
You can use pass stream axes as parameters to a gate. For example:
\`\`\`js
s0.x.sine()
s0.y.saw()
s0.z.noise()
q0.u3([s0.y,s0.x,s0.z])
\`\`\`
This will apply a U3 gate to qubit 0 with the parameters set by the patterns \`.x\`, \`.y\`, and \`.z\` of stream 0. Or, you can use any custom pattern defined in the usual way. For example:
\`\`\`js
q0.u3([$sine(),$saw(),$noise()])
\`\`\`

### Gate position
By default, adding gates places them sequentially on the wire. You may need to offset the position and move the gate further along the wire. 
\`\`\`js
q0.cx(1)
q1.cx(2)
q2.cx(3,2)
q3.cx(4,3)
\`\`\`

### Arguments
We therefore have three potential arguments for each gate: the connected qubit(s), the parameters, and the position. Some gates require all three, some only require one or two. This being a live coding environment, we want to write as little code as possible. As a rule, arguments are ordered as follows: connected qubit(s), parameters, position. If a gate does not expect connected qubits, or parameters, these can be omitted. For example:
\`\`\`js
q0.x(2) // no target qubit or parameters, so arguments are just [position]
q0.u3([0.1,0.2,0.3],2) // no target qubits but parameters can be specified, so arguments are [parameters, position]
q0.ccx([1,2],2) // target qubits and position can be specified, so arguments are [target qubits, position]
q0.xx(2,0.5,0) // a rare example of a gate that requires all three arguments [target qubits, parameters, position]
\`\`\`
See the [Wire class documentation](/docs/classes#wire) for a list of the main gates and their parameters. See the [Quantum Circuit documentation](https://www.npmjs.com/package/quantum-circuit#implemented-gates) for a full list of gates and their parameters.

### Feedback
Use the \`.fb()\` method to apply feedback to a wire. This will use the previous measurement as the initial state of the qubit before the circuit runs. For example:
\`\`\`js
q0.x().fb()
\`\`\`
By default, prior results are taken from the same qubit. However, you can specify a different qubit as the input for feedback by passing it as an argument. For example:
\`\`\`js
z.bpm.set(20)
q0.h()
q1.fb(0) // uses the previous measurement of stream 0 as the initial state
\`\`\`

## Sonifying Data
There are a number of Pattern methods that can fetch and manipulate the results of running a quantum circuit. These can be used as data to be sonified. All methods associated with Zen's quantum mode are prefixed with a \`q\`.

### Measurement
\`qmeasurement()\`, alias \`qm()\`, returns the collapsed state of a qubit: either a |0⟩ or |1⟩. This is useful for triggering events. The first argument is the index of the qubit you wish to measure. For example:
\`\`\`js
s0.set({inst:0,reverb:0.125,rtail:0.2,cut:0,cutr:250,dur:100,mods:0.1})

q0.u3([s0.y,s0.x,0])

s0.y.noise()
s0.x.sine(0,1,1/3)

s0.p._n.set(s0.y).set('Cpro%16..*16 | Cpro%16..?*16').sub('0?12*16')
s0.p.modi.set(s0.x).saw()
s0.e.qmeasurement(0) // measure qubit 0. If it collapses to |1⟩, trigger the event
s0.m.not(s0.e)
\`\`\`

By default, measurements are taken at each division of the cycle. However, repetition is musically useful. Passing an integer greater than 1 as the second argument will cause the measurement to loop. For example:
\`\`\`js
s0.e.qmeasurement(0,8) // measure qubit 0, loop after 8 measurements
\`\`\`

You can also set the number of times this loop should repeat before regenerating with new measurements. For example:
\`\`\`js
s0.e.qmeasurement(0, 8, 4) // measure qubit 0, loop after 8 measurements, repeat 4 times
\`\`\`

You can achieve the same thing using a Pattern's \`.cache\` method:
\`\`\`js
s0.e.qmeasurement(0).cache(8,4) // measure qubit 0, loop after 8 measurements, repeat 4 times
\`\`\`

### Measurements
Use \`qmeasurements()\`, alias \`qms\`, to get the measurements of all qubits as an array.
\`\`\`js
s0.e.qmeasurements().at(0) // this is the same...
s0.e.qmeasurement(0) // ...as this
\`\`\`

You can pass an integer greater than 1 as the first argument to loop the measurements, and an integer as the second argument to set the number of times this loop should repeat before regenerating with new measurements.

### Probability
Use the \`qprobability()\`, or alias \`qpb\`, method to get the probability (squared amplitude coefficient) of a given basis state. The number of states in a quantum system is 2 to the power of the number of qubits. In a system with 2 qubits, there are 4 possible basis states (|00⟩, |01⟩, |10⟩, |11⟩). To get the probability for state |01⟩, for example, pass in the integer 1:
\`\`\`js
q0.rx(0.25)
q1.rx(0.75)

s0.p.amp.qpb(1).print() // print the probability of the state |01⟩ to the console
s0.e.every(4)
\`\`\`

Using the probability as the input for a gate creates interesting feedback loops. For example:
\`\`\`js
s1.y.qpb(0)

q0.h().cx([1]).ccx([1,2])
q1.fb(0).rx(s1.y);

[s0,s1,s2].map((s,i) => s.e.qmeasurement(i,32))
\`\`\`
Each probability is returned as a float to 5 decimal places. As with other methods, you can pass a loop length as the second argument.

### Probabilities
Use the \`qprobabilities()\`, or alias \`qamps\`, method to get an array of the probabilities for each possible result of a circuit. For example:
\`\`\`js
s0.wire.rx(0.25)
s1.wire.rx(0.75)

s0.p.amp.pbs().print() // print all probabilities to the console
s0.e.every(4)
\`\`\`
As with other methods, you can pass a loop length as the first argument.

Using the grid can be useful for seeing what is happening here, especially when you start to use dynamic parameters:
\`\`\`js
z.grid.set(qpbs().fn(a=>[a]))

q0.rx($saw())
q1.rx($saw(1,0))
q2.h()
\`\`\`

### Phase
Use the \`qphase()\`, or alias \`qp\`, method to get the phase of a basis state. For example:
\`\`\`js
q0.h()
q1.h().t()
q2.h().s()
q3.h().z()

s0.y.qphase(5)
s0.e.set(1)
\`\`\`

### Phases
Use the \`qphases()\`, or alias \`qps\`, method to get an array of the phases of each basis state. For example:
\`\`\`js
s0.p.z.sine(0,saw(),0,1/16)
q0.h().rz(s0.p.z)
q1.h()
q2.h()
q3.h().z()

s0.y.qphases().at(t=>t%z.q)
s0.e.set(1)
\`\`\`

### Result
Return the measured state of the system as an integer, using the \`qresult()\`, or alias \`qr\`, method. For example:
\`\`\`js
q0.h()
q1.h()

s0.x.qresult().div(4)
s0.e.every(4)
\`\`\`

## Importing Code

### QASM Strings
Use the \`import()\` method on any qubit to import a quantum circuit from a QASM string. For example:
\`\`\`js
q0.import(\`OPENQASM 2.0;
include "qelib1.inc";
qreg q[6];
h q[0];
cx q[0], q[1];
cx q[1], q[2];
cx q[2], q[3];
cx q[3], q[4];
ry (1.57) q[4];
cx q[4], q[5];
cx q[3], q[4];
cx q[2], q[3];
cx q[1], q[2];
cx q[0], q[1];
h q[0];\`)
\`\`\`
Remember to use backticks to wrap the string, so that JavaScript can interpret the line breaks.

## Exporting Code
Use \`exportCircuit()\` to export the current circuit as QASM or Qiskit string. For example:
\`\`\`js
q0.h()

print(exportCircuit('qasm))
print(exportCircuit('qiskit))
\`\`\`
`,re="# Working with Data\nSonifying data open up new avenues of musical exploration. Zen provides a simple way of fetching and storing data from the web. This chapter will not explore sonification strategies, but rather focus on the data fetching and storing process.\n\n## The Data Object\nAll data is stored in local storage within your browser so that it persists between sessions. You can access this data using the `data` object, represented by the variable `d`. This object has some simple methods.\n\n### d.fetch()\nThe `fetch()` method is used to retrieve data from the web. It takes a URL and a key as arguments. In a web worker, it fetches whatever data is returned from making a GET request to the URL and stores it in local storage under the key. For example:\n```js\n// This will fetch the data from the URL and store it under the key 'packet'\nd.fetch('https://zendata.cephasteom.co.uk/api/packet', 'packet')\n\n\n// console.log(d.packet)\n```\n\nOnce a success message has been printed to the console, you can access the data using `d` and the key you provided, in this case `d.packet`:\n\n```js\n// console.log(d.packet)\n```\n",ie=`# Clocks
By default, Zen uses its own internal clock to trigger events. In most cases this is sufficient, but sometimes you may want to synchronise Zen with your DAW, or with another performer. In this case, you can set Zen to be controlled by an external MIDI clock.

## z.clock
You can control clock settings with the \`z.clock\` property. This is an instance of the Pattern class, but you'll only want to use the \`.set\` method. This expects an object with the following properties:
\`\`\`javascript
z.clock.set({
  src: 'midi', // 'internal' or 'midi'
  device: 0, // MIDI device index. To see available devices, run midi()
})
\`\`\`
Execute this twice, using shift+enter, to set the clock to MIDI.

## MIDI Clock
Zen will now listen for MIDI clock messages on the selected device. You can transmit MIDI clock messages from your DAW, or from a hardware device - refer to devices own documentation. For example, here's how to transmit messages for [Logic](https://support.apple.com/en-gb/102005). Zen will respond to the start, stop, and continue messages, as well as the clock itself. \`z.q\` will determine how many divisions of a cycle will be triggered by clock messages.
`,le={intro:B,getting_started:Q,the_editor:X,patterns:$,streams:H,mini_notation:N,mutations:V,the_canvas:ee,zen_quantum:oe,instruments:K,effects:ne,custom_samples:J,global_settings:se,midi:te,utilities:ae,data:re,clocks:ie},C=Object.entries(le).map(([h,e])=>({title:Y(h),slug:G(h),markdown:e}));function F(h,e,o){const n=h.slice();return n[0]=e[o].slug,n[1]=e[o].title,n}function P(h){let e,o,n=h[1]+"",r;return{c(){e=d("a"),o=d("li"),r=Z(n),this.h()},l(l){e=p(l,"A",{href:!0,class:!0});var u=b(e);o=p(u,"LI",{});var w=b(o);r=A(w,n),w.forEach(i),u.forEach(i),this.h()},h(){y(e,"href","/learn/"+h[0]),y(e,"class","chapter svelte-19qt133")},m(l,u){k(l,e,u),c(e,o),c(o,r)},p:j,d(l){l&&i(e)}}}function he(h){let e,o,n,r,l,u,w,x,f,v=C,a=[];for(let t=0;t<v.length;t+=1)a[t]=P(F(h,v,t));return{c(){e=d("meta"),o=z(),n=d("section"),r=d("div"),l=d("h1"),u=Z("Learn"),w=z(),x=d("nav"),f=d("ul");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){const m=L("svelte-1wicnyl",document.head);e=p(m,"META",{name:!0,content:!0}),m.forEach(i),o=I(t),n=p(t,"SECTION",{class:!0});var s=b(n);r=p(s,"DIV",{class:!0});var g=b(r);l=p(g,"H1",{});var T=b(l);u=A(T,"Learn"),T.forEach(i),w=I(g),x=p(g,"NAV",{});var S=b(x);f=p(S,"UL",{class:!0});var _=b(f);for(let q=0;q<a.length;q+=1)a[q].l(_);_.forEach(i),S.forEach(i),g.forEach(i),s.forEach(i),this.h()},h(){document.title="Zen | Learn",y(e,"name","description"),y(e,"content","Learn how to make music with Zen, a musical live coding language that runs in your browser."),y(f,"class","svelte-19qt133"),y(r,"class","content__inner svelte-19qt133"),y(n,"class","content svelte-19qt133")},m(t,m){c(document.head,e),k(t,o,m),k(t,n,m),c(n,r),c(r,l),c(l,u),c(r,w),c(r,x),c(x,f);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(f,null)},p(t,[m]){if(m&0){v=C;let s;for(s=0;s<v.length;s+=1){const g=F(t,v,s);a[s]?a[s].p(g,m):(a[s]=P(g),a[s].c(),a[s].m(f,null))}for(;s<a.length;s+=1)a[s].d(1);a.length=v.length}},i:j,o:j,d(t){i(e),t&&i(o),t&&i(n),R(a,t)}}}class pe extends D{constructor(e){super(),U(this,e,null,he,E,{})}}export{pe as component,de as universal};
