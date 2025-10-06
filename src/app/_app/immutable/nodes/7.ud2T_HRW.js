import{d as v}from"../chunks/6kMzFPiD.js";import{f as u,h as q,a as l}from"../chunks/5Htp7xWK.js";import"../chunks/Ynsqquil.js";import{$ as x,c as a,s as p,r as s,t as S,l as f}from"../chunks/DvAM2fMV.js";import{s as k}from"../chunks/B3XtGYCh.js";import{e as j,i as C,s as T}from"../chunks/cwvdLmrO.js";const A=v,F=!0,le=Object.freeze(Object.defineProperty({__proto__:null,csr:A,prerender:F},Symbol.toStringTag,{value:"Module"}));function z(e){return e.replace(/_/g," ").replace(/^\w/,t=>t.toUpperCase())}function I(e){return e.replace(/_/g,"-").toLowerCase()}const M=`# Intro
Welcome to Zen! Here, you can generate complex musical patterns using a simple JavaScript API, and harness quantum computing algorithms to explore new approaches to sound design. Zen is a holistic, standalone environment, with a suite of high-quality instruments and effects - including synths, samplers, effects and filters. It can also be integrated into your existing studio through MIDI.

This is a tutorial to help you get started. For more information, check out the [docs](/docs).

Zen will work in most browsers but, for best performance, we recommend something Chromium-based.

Enjoy!
`,Z=`# Getting Started
Before we get into Zen’s nuts and bolts, copy the following example into the editor and press shift + enter. Change some values, comment out a few lines and see if you can work out what each part does. When you’ve finished, press esc to stop playback.

\`\`\`javascript
s0.set({inst:0,reverb:.5,delay:.25,vol:.5,modi:1.25,mods:0.1,lag:1000})
s0._n.set('Cpro%16..*16 | Cpro%16..?*16').sub(12),
s0.s.noise(.25,0.05,0.5)
s0.e.every(4).or(every(3))
s0.m.rarely()
\`\`\`
`,P="# The Editor\nOn the left of the UI is the code editor and on the right is the console. The buttons below the header are to start and stop playback, open and save files, and show and hide the quantum circuit. Clicking or typing in the editor hides the header.\n\nEditor commands:\n- `shift+enter` executes the code and starts playback\n- `esc` stops playback.\n- `cmd+o` opens presets and saved files\n- `cmd+s` saves your code\n",D="# Streams\nThe [Stream class](/docs/classes#stream) represents separate musical layers, written as `s0`, `s1`, `s2` ... `s63`. Think of Streams as tracks on a mixing desk, each with its own instruments and effects.\n\nA Stream is just an object that returns a Pattern when you access a property. For example, `s0.n` returns a Pattern that can be used to set note values, whereas `s0.reverb` returns a Pattern that can be used to set the reverb, and so on. Any key will work: even `s0.banana` will return a Pattern, though it's unlikely that it will be useful.\n\nYou can set properties directly, as follows:\n```js\ns0.inst.set('synth')\ns0.n.saw(2,48,64)\ns0.e.sometimes()\n```\n\nOr you can set multiple properties at once using  the `.set()` method. The following example is equivalent to the previous one:\n```js\ns0.set({inst: 'synth', n: saw(2,48,64).add(48), e: sometimes()})\n```\n\nKeys are mapped to the the instruments and effects in the synth engine. For example, if you are using the sampler, you'll want to set a sample bank and index: \n```js\ns0.set({inst: 'sampler', bank: 'bd808 sd808'})\ns0.i.random(1,15).step(1).cache(16,4)\ns0.e.sometimes().cache(16,4)\n```\n\nYou can find a full list of instruments and their parameters in the [Synths docs](/docs/synths), and a full list of effects and their parameters in the [Effects docs](/docs/fx).\n\nHere are some special stream properties.\n\n## .e\n`.e` triggers events on the stream. If `.e` is greater than 0, an event is triggered. There are many Pattern methods that simply return 1s and 0s.\n\nHere are some different ways you can trigger a stream. Try replacing the final line of the previous example with one of the following:\n```js\ns0.e.every(4).print('e')\n```\n\n```js\ns0.e.every(4).or(every(3)).print('e')\n```\n\n```js\ns0.e.sine().step(1).print('e')\n```\n\n```js\ns0.e.set('1?0*16').print('e')\n```\n\n```js\ns0.e.set('3:8*2').print('e')\n```\n\n## .m\n`.m` *mutates* parameters whilst a synth is playing. We'll cover this in depth in a [later chapter](/learn/mutations). It works in the same way as `.e`. The following example mutates the stream every 4 beats.\n```js\ns0.m.every(4).print('m')\n```\n\n## .cut\nCut is a special parameter that stops notes in the same or other streams when an event is triggered. You can pass one or more numbers referencing the streams to cut. For example, `s0.set({cut:0})` will cut notes in stream 0 short. Try commenting out the `cut` line in the following example:\n```js\ns0.set({inst:'synth', n:'Ddor%16..*16'})\ns0.cut.set(0)\ns0.e.sometimes()\n```\n\n## .solo and .mute\nUsed to solo or mute a stream.\n```js\ns0.solo.set(1) // solo stream 0\ns1.mute.set(1) // mute stream 1\n```\n\n## .level\nSet the level of the stream after all effects and filters. Think of it as the final fader on a mixing desk channel strip. Expects a value between 0 and 1.\n\n## .out\nBy default, all streams are routed to the first two channels of your output device. You can route streams using the `out` parameter. For example, `s0.set({out: 2})` will route stream 0 to channels 2 and 3. Streams are always stereo. Here's a shorthand way of spreading your streams across the outputs of your audio interface:\n```js\nstreams.slice(0,8).map((stream,i) => stream.ps({out: i*2}))\n```\n",_="# Patterns\nThe [Pattern class](/docs/classes#pattern) is Zen’s core building block — in Zen, *everything is a pattern*. Run this code and see the changing values in the console:\n```js\ns0.x.saw().print('x')\ns0.e.every(1).print('e')\n```\nHere, `s0` is a Stream. Every parameter of a Stream returns a Pattern. `.e` is a special parameter that triggers events. Other parameters like `.x`, `.y`, or even `.banana`, are user-defined and can be used for anything you like. We'll cover Streams in depth in the [next chapter](/learn/streams). \n\nPatterns have many methods for generating interesting patterns of values. For example, the `.set()` method is used to set a constant value, whereas `every()` returns a 1 every *n* divisions. For example:\n```js\ns0.x.set(0.5).print('x')\ns0.e.every(4).print('e')\n```\n\nOthers, like `.sine()`, `.tri()`, and `.square()`, return values that change over time. Most methods generate values between 0 and 1, and take additional arguments for frequency and scaling:\n```js\ns0.x.sine(2,0,0.5).print('x') // a sine wave that oscillates between 0 and 0.5 every 2 cycles\ns0.e.set(1) // trigger the stream\n```\n\nPattern methods can be chained:\n```js\ns0.x.sine(1,0.5,1) // this is the same...\ns0.x.sine(1).mtr(0.5,1) // ...as this\n```\n\nPattern arguments don't have to be numbers; you can use other patterns:\n```js\ns0.x.sine().print('x')\ns0.y.set(1).sub(s0.x).print('y') // set y to be the inverse of x\ns0.e.set(1)\n```\n\nYou can nest Patterns. For example:\n```js\ns0.x.saw(0.25,0,64)\n    .mul(coin().ifelse(1,100))\n    .print('x')\ns0.e.set(1)\n```\n\nYou can also use [mini-notation](/learn/mini-notation), which we'll cover in more detail later. For example:\n```js\ns0.x.set(\"0 0.25 0.5 0.75\").print('x')\ns0.y.set(\"0..8*8\").print('y')\ns0.n.set('D4 F4 A4 B4').print('n')\ns0.e.every(4)\n```\n\nFor a full list of Pattern methods and their arguments, see the [Pattern docs](/docs/classes#pattern).\n",U="# Mini-notation\nInspired by [Tidal Cycles](https://tidalcycles.org/), Zen features a mini-notation for expressing patterns. It parses these strings into arrays of values and selects the correct value based on the current time.\n\n## Basic syntax\nCreate an array of length 16 and fill with 1s:\n```js\ns0.e.set('1*16').print('e') // triggers on every division\n```\n\nCreate an array of length 16 and randomly fill it with 1s and 0s:\n```js\ns0.e.set('1?0*16').print('e')\n```\n\nCreate a sequence:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('1*16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.x.set('0..15?*16').print('x')\ns0.e.set('1*16')\n```\n\nAlternate between values:\n```js\ns0.x.set('0,1*2').print('x')\ns0.e.set('1*16')\n```\n\nAlternate between values:\n```js\ns0.x.set('0,0.25,0.5,0.75*4').print('x')\ns0.y.set('0,0.25,0.5,0.75*16').print('y')\ns0.e.set('1*16')\n```\n\nNotate bars:\n```js\ns0.x.set('0..15*16 | 15..0*16 |').print('x')\ns0.e.set('1*16')\n```\n\nRepeat bars:\n```js\ns0.x.set('0..15*16 |*2 15..0*16 |*3').print('x')\ns0.e.set('1*16')\n```\n\nStretch bars:\n```js\ns0.x.set('0..15*16 |^3').print('x')\ns0.e.set('1*16')\n```\n\nYou can repeat bars, then stretch them, but not the other way around:\n```js\ns0.x.set('0..15?*16 |*2^3').print('x')\ns0.e.set('1*16')\n```\n\n## Euclidean rhythms\n\n[Euclidean rhythms](https://en.wikipedia.org/wiki/Euclidean_rhythm) spread *x* beats over a *y* divisions, as equally as possible.\n\n4 pulses over 16 divisions:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('4:16')\n```\n\n3 pulses over 8 division:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('3:8')\n```\n\n3 over 8, twice per bar:\n```js\ns0.x.set('0..15*16').print('x')\ns0.e.set('3:8*2')\n```\n\n## Note values\nMidi note values are notated as `<root><octave>`, where the root is a capital letter and the octave is an number.\n```js\ns0.set({inst:0,reverb:0.5,cut:0,cutr:100})\ns0.n.set('C4 E4 G4 B4')\ns0.e.sometimes()\n```\n\n## Chords and scales\nChords and scales are handled identically. Both return an array of note values. Scales were gratefully adapted from Tidal Cycle's [scale library](https://github.com/tidalcycles/Tidal/blob/fcc4c5d53a72dcf2b8f4c00cc1c1b3c75eef172d/src/Sound/Tidal/Scales.hs#L4).\n\n### Chords\nChords are notated as `<root><triad><extension?>`, where the root is a capitalised letter, the triad is one of `ma`, `mi`, `di`, `au`, `su` (major, minor, diminished, augmented, suspended), and the (optional) extension is one of `6`, `7`, `#7`, `b9`, `9`, `11`, `#11`, `13`, `#13`:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7')\ns0.e.set('9:16')\n```\n\nTurn the chord into a sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7..*8')\ns0.e.set('9:16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7..?*16')\ns0.e.set('9:16')\n```\n\nSpecify the length of the chord:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100})\ns0.n.set('Cmi7%16..*16')\ns0.e.set('1*16')\n```\n\nA number of Pattern methods handle arrays and can be useful here:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Cmi7').at(t())\ns0.e.set('1*16')\n```\n\n### Scales\nScales are notated `<root><scale>` and can be treated in the same way:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd*16')\ns0.e.set('3:8*2')\n```\n\nTurn the scale into a sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd..*16')\ns0.e.set('1*16')\n```\n\nRandomly choose from the sequence:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd..?*16')\ns0.e.set('1*16')\n```\n\nSpecify the length of the scale:\n```js\ns0.set({inst:0,reverb:0.5,cut:0,dur:10,r:100,vol:0.5})\ns0.n.set('Clyd%16..?*16')\ns0.e.set('1*16')\n```\n\nExecute `scales()` in the editor to print a list of available scales in the console.\n\n## Mini-notation can be used anywhere!\nMini-notation can be used in place of any value in Zen, making it enormously powerful. For example:\n```js\ns0.set({inst:0,reverb:'0.5?0*16',cut:'0?1*16',dur:10,r:100,vol:0.5})\ns0.n.set('Clyd%16..?*16')\ns0.e.set('1*16')\n```\n",E="# Mutations\nWhilst many live coding environments only allow you to set parameters before you trigger a voice, Zen allows you to update any parameter, whilst the voice is playing. The `.m` parameter stands for mutation. As with events, when the Pattern returns a value greater than 0, a mutation is triggered. Parameters to be mutated should be prefixed with `_`.\n```js\ns0.set({inst:'synth',cut:0,re:0.25,rdecay:0.75,de:0.25,lag:ms(2),locut:0.3,vol:0.5})\ns0._n.set('Dpro%16..?*16|*4').sub('0?12*16')\ns0.e.every('1?2*16')\ns0.m.not(s0.e)\n```\nIn the example above, try adding and removing the `_` prefix from n.\n\nFinally, `lag` determines how many milliseconds it should take to ramp from one value to the next.\n",O=`# Custom Samples
There are a number of ways to load your own samples in Zen. 

## loadSamples()
The \`loadSamples()\` function allows you to load samples that are publicly available via a URL. It takes two arguments: an object containing sample banks, and arrays of sample URLs, and an optional base URL to prepend to each sample URL.
\`\`\`js
loadSamples(
  {test: ['808bd/BD0000.WAV'], '808bd/BD0001.WAV']}, 
  'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/'
)

s0.set({inst:1,bank:'test'})
s0.e.every(2)
\`\`\`

You can also load a JSON file containing the sample bank object. For example, here's how you can rather brazenly load the Dirt Samples from TidalCycles:
\`\`\`js
loadSamples(
  'https://raw.githubusercontent.com/tidalcycles/dirt-samples/main/strudel.json',
  'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/'
)

s0.set({inst:1,bank:'ravemono'})
s0.e.every(16)

samples()
\`\`\`

## localhost:6060
Zen fetches samples via HTTP requests, looking for additional, locally served files on localhost:6060. To serve your own samples, download and install this [simple package](https://github.com/cephasteom/zen-connect). Follow the instructions in the README.md and refresh Zen. Your custom samples should be listed in the console when you run the command \`samples()\`.

## Desktop App
If you are using the Zen desktop app, you can load any directory of directories containing samples. The app will load all samples, using the directory names as sample banks. Go to File > Load Samples Directory.
`,R=`# Instruments
Zen has a range of high-quality instruments and effects. Full documentation for instruments and effects can be found in the [docs](docs).

## Generic Parameters
Most instruments share a common set of parameters. Envelope parameters are \`a\` (attack), \`d\` (decay), \`s\` (sustain), \`r\` (release). The \`dur\` parameter controls the duration of the note, the \`amp\` parameter controls the amplitude of the note, and the \`vol\` parameter controls the overall volume of the instrument. \`lag\` determines the time in ms it takes for a stream to mutate (see [mutations](/learn/mutations)), whilst \`nudge\` allows you to delay a stream's events by a given amount of time (in ms).

## Synth
An all purpose synth with filters and FM:
\`\`\`js
s0.set({inst:'synth',cut:0,re:0.25,rdecay:0.75,de:0.25,lag:ms(2),locut:0.3})

s0.x.saw()
s0.y.noise()

s0.n.set('Dpro%16..?*16|*4').sub(12)
s0.mods.random(0.1,1,0.5)
s0.dur.noise(1,0.1,2).btms()
s0._modi.set(s0.x).saw(0.25,0.5)
s0._harm.set(s0.y).saw(0.5,3,0.25)

s0.e.every('1?2*16')
s0.m.not(s0.e)
\`\`\`

## Sampler
The sampler takes the name of a sample bank and the index of a file within that directory. To print a list of available sample banks, type \`samples()\` into the editor. See the chapter on [Custom Samples](/learn/custom-samples) to load your own.
\`\`\`js
z.bpm.set(160)

s0.set({inst:1,bank:'breaks',snap:16,dur:ms(1),cut:[0,1,2],e:'1'})
s1.set({inst:1,bank:'sd808',cut:2,s:.1,e:'0 1'})

s2.set({inst:1,ba:'breaks',snap:16,cut:[0,1],dur:ms(8),loop:1,cutr:ms(0.5),re:0.125,rs:0.1})
s2.x.random(0,1,1/4)
s2.begin.set(s2.x).step(1/32)
s2.i.set('0|*3 1')
s2.e.not(s0.e)
  .xor(rarely())
\`\`\`

## Granular Synth
Similar to the sampler, the granular synth expects a sample bank and index. Granular synthesis allows you to treat pitch \`n\` and playback speed \`rate\` separately.
\`\`\`js
z.bpm.set(160)

s0.set({inst:'granular',bank:'cpu2',i:2,snap:q(),dur:ms(8),cut:[0,1,2],rate:0.5,lag:ms(1/4),vol:0.5,reverb:1,locut:0.25})
s0._n.sine(.25,60,72)
s0._i.random(0,16,1)
s0.e.set('1|0')
s0.m.not(s0.e)
\`\`\`
`,W=`# MIDI
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
s0.n.set('60 62 64 65 67 69 71 72')
s0.e.every(2)
// send cc messages
s0.cc1.sine()
\`\`\`

## MIDI Input
Patterns can also use midi control changes and currently pressed keys as input. The following methods are available:
\`\`\`js
// use the modulation wheel on device 10 as input, with an initial value of 0.5
s0.vol.midicc(1,10,0.5)
// use all pressed keys on device 10 as input
s0.n.midinote(10)
\`\`\`

## MIDI Parsing
Zen can parse midi files and extract note and event data:
\`\`\`js
let bassfile = 'http://localhost:6060/midi/tune03/tune03-bass.mid' // must be hosted somewhere accessible

s0.set({inst: 0, cut:0})
s0.n.midifile(bassfile, 'n') // use the note data
s0.e.midifile(bassfile, 'e') // use the event data
\`\``,B="# Global Settings\n\nGlobal settings can be set using the `z` object, which is just another instance of a [Stream class](/docs/classes#stream). \nEach of the following properties are instances of the [Pattern class](/docs/classes#pattern), allowing you to set them using any of the pattern methods.\n\n## z.t\n`z.t` sets the global time of the piece. By default this increments by 1 every division, but it can be interesting to modulate it. All Streams inherit this time value, unless you use .t() on the Stream - e.g. `s0.t.noise(.25, 0, 32).step(1)`.\n```js\nz.t.saw(1,0,16) // loop between 0 and 16\nz.t.sine(.25, 0, 16) // modulate the time with a sine wave\n```\n\n## z.bpm\n`z.bpm` sets the tempo of the piece in beats per minute.\n```js\nz.bpm.set(80) // set a constant bpm\nz.bpm.sine(.5, 60, 120) // modulate the bpm between 60 and 120 bpm with a sine wave\n```\n\n## z.q\n`z.q` sets the the amount of divisions per cycle. By default, this is 16.\nYou should probably only set this using `z.q.set(...)`. Other methods may lead to some unexpected, but perhaps interesting, results.\n\n## z.seed\nYou can seed the random number generator using `z.seed`, allowing you to use randomness with repeatable results. E.g.:\n```js\nz.seed.set(256)\n```\n\n## z.swing\nSwing can be set globally using the `z.swing` property. Swing is a value between 0 and 1, with 0 being no swing and 1 being full swing. Swing is applied to all streams. \n```js\nz.swing.set(0.25) // set a constant swing\n```\n\n## z.swingn\nAdditionally, set the subdivision to swing using the `z.swingn` property. By default, this is set to 8th notes.\n```js\nz.swing.set(0.25)\nz.swingn.set(16) // swing 16th notes\n```\n",Y="# Utilities\nThere are a number of utility functions useful for controlling Zen.\n\n`clear()` clears the console\n\n`scales()` show all scales that can be used in the mini-notation\n\n`chords()` show all chords that can be used in the mini-notation\n\n`samples()` show all samples that are available to use\n\n`midi()` show all available midi devices\n\n`loadSamples()` load your own samples - see [Custom Samples](/learn/custom-samples)\n\n`exportCircuit(<format>)` prints the current circuit to the console as a string. Formats are 'qasm' or 'qiskit'. Default is 'qasm'.\n\n`btms(<beats>)` an alias for `set(<beats>).btms()`, allowing you to quickly set a time value locked to the current bpm. E.g.:\n\n```js\nz.bpm.set('60 | 120')\n\ns0.set({inst:0, dur:btms(1), r:10, e:'1'})\n```\n",L=`# FX
Full documentation for effects can be found in the [docs](/docs/fx).

## Track FX and FX Streams

Track FX are applied to the output of a stream. Each track has a chain of effects attached to it, including reverb, delay, distortion and high and low cut filters. For efficiency, these are only created when you use them, so you might hear a small glitch whilst they are being created.
\`\`\`js
s0.set({inst:'synth',cut:0,reverb:0.5,rtail:0.5,de:0.25,lag:ms(2),locut:0.3,vol:0.5})
s0._n.set('Dpro%16..?*16|*4').sub('0?12*16')
s0.e.every('1?2*16')
s0.m.not(s0.e)
\`\`\`

Using separate reverbs, delays, etc. for every track is expensive. FX Streams are separate streams for managing your effects, like an effects bus on your mixing desk. FX streams are represented by the variables \`fx0\`, \`fx1\`, etc. Route a stream to an FX stream using the variable name as a parameter. The following example routes \`s0\` to \`fx0\`:
\`\`\`js
s0.set({
    inst:'synth',cut:0,lag:ms(2),locut:0.3,vol:0.5,
    fx0:0.5 // send half of the signal to the fx bus
})
s0._n.set('Dpro%16..?*16|*4').sub('0?12*16')
s0.e.every('1?2*16')
s0.m.not(s0.e)

fx0.set({reverb:1,rsize:0.5})
fx0.rtail.saw().mtr(0,.25)
fx0.e.every(1) // you still need to trigger events on an fx stream
\`\`\`
`,G=`# Zen Quantum
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

The outcomes of circuit executions, encompassing the state vector, individual qubit measurements, basis states, probabilities, and amplitude coefficients, can serve as data to be sonified within your Zen code. In the remainder of this section, we explain how to construct quantum circuits within Zen, and how to access the available quantum data within your compositions. For a more detailed explanation of quantum computer music, see [Miranda (2022)](https://link.springer.com/book/10.1007/978-3-031-13909-3) or [Thomas (2025)](https://researchportal.plymouth.ac.uk/en/studentTheses/zen-and-the-art-of-praxis).

Run the following example to get a feel for quantum programming in Zen:
\`\`\`js
q0.h().cx([1]).ccx([1,2])
q1.fb(0)
q2.fb(1)

s0.set({inst: 1, bank: 'bd808', i: 3, cut: 0, e: qm(0)})
s1.set({inst: 1, bank: 'sd808', i: '0..1?*16', cut: [0,1], e: qm(1)})
s2.set({inst: 1, bank: 'hh', i: '0..16?*16', cut: [0,2], vol: 0.5, e: qm(2)})
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
q0.u3([sine(),saw(),noise()])
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
s0.x.sine(1/3,0,1)

s0._n.set(s0.y).mtr(0,16).set('Cpro%16..*16 | Cpro%16..?*16').sub('0?12*16')
s0._modi.set(s0.x).mtr(1,10)
s0.e.qmeasurement(0) // measure qubit 0. If it collapses to |1⟩, trigger the event
s0.m.not(s0.e)
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

s0.amp.qpb(1).print() // print the probability of the state |01⟩ to the console
s0.e.every(4)
\`\`\`

Using the probability as the input for a gate creates interesting feedback loops. For example:
\`\`\`js
s1.y.qpb(0)

q0.h().cx([1]).ccx([1,2])
q1.fb(0).rx(s1.y);

[s0,s1,s2].map((s,i) => s.e.qmeasurement(i,32))
\`\`\`
Each probability is returned as a float to 5 decimal places.

### Probabilities
Use the \`qprobabilities()\`, or alias \`qamps\`, method to get an array of the probabilities for each possible result of a circuit. For example:
\`\`\`js
s0.wire.rx(0.25)
s1.wire.rx(0.75)

s0.amp.pbs().print() // print all probabilities to the console
s0.e.every(4)
\`\`\`

Using the grid can be useful for seeing what is happening here, especially when you start to use dynamic parameters:
\`\`\`js
z.grid.set(qpbs().fn(a=>[a]))

q0.rx(saw())
q1.rx(saw())
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
s0.z.sine(1/16,0,saw()))
q0.h().rz(s0.z)
q1.h()
q2.h()
q3.h().z()

s0.y.qphases().at(t().mod(q()))
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

print(exportCircuit('qasm'))
print(exportCircuit('qiskit'))
\`\`\`
`,Q="# Working with Data\nSonifying data open up new avenues of musical exploration. Zen provides a simple way of fetching and storing data from the web. This chapter will not explore sonification strategies, but rather focus on the data fetching and storing process.\n\n## The Data Object\nAll data is stored in local storage within your browser so that it persists between sessions. You can access this data using the `data` object, represented by the variable `d`. This object has some simple methods.\n\n### d.fetch()\nThe `fetch()` method is used to retrieve data from the web. It takes a URL and a key as arguments. In a web worker, it fetches whatever data is returned from making a GET request to the URL and stores it in local storage under the key. For example:\n```js\n// This will fetch the data from the URL and store it under the key 'strudel'\nd.fetch('https://raw.githubusercontent.com/tidalcycles/dirt-samples/main/strudel.json', 'strudel')\n\n\n// console.log(d.strudel)\n```\n\nOnce a success message has been printed to the console, you can access the data using `d` and the key you provided, in this case `d.strudel`:\n\n```js\n// console.log(d.strudel)\n```\n",H=`# Clocks
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
Zen will now listen for MIDI clock messages on the selected device. You can transmit MIDI clock messages from your DAW, or from a hardware device - refer to devices own documentation. For example, here's how to transmit messages for [Logic](https://support.apple.com/en-gb/102005). Zen will respond to the start, stop, and continue messages, as well as the clock itself. \`z.q.set(...)\` will determine how many divisions of a cycle will be triggered by clock messages.
`,N=`# Modes
By default, Zen evaluates your code on each division of the cycle. However, it can also be approached as a playable instrument, triggered by MIDI. This can be achieved by setting the mode. Here's a working example:
\`\`\`javascript
midi() // To see available devices

z.mode.set({
    trigger: 'noteon', // 'noteon' or 'division', default is 'division'
    device: 1 // MIDI input device index. To see available devices, use midi() and check the console
})

s0.set({inst: 0})
s0.n.midinote(1).at(-1) // use the last note to be played as the n value
s0.e.set(1) // trigger an event every time a note is received
\`\`\`

To return to the default mode, either set trigger to 'division', or simply delete the mode property and Zen will revert to the default.

`,X="\n# ZMod\n\nZMod (Zen Modular) lets you build your own modular synth patches using a simple JavaScript API. It works like a rack of connected sound modules—oscillators, filters, effects, etc.\n\n## Basic Usage\n\nSet the `inst` to `zmod` and provide a patch string using ZMod syntax:\n\n```js\ns0.set({ inst: 'zmod', patch: 'sine(100).amp(0.5).pan(0.5)' })\ns0.e.every(16)\n```\n\n### Parameters\n\nThe example above plays a constant drone. You can control its parameters with signals. `sig` takes a name and an optional default value:\n\n```js\ns0.set({ inst: 'zmod', patch: \"sine(sig('freq', 100)).amp(sig('amp')).pan(sig('pan'))\" })\n```\n\nNow you can update parameters live on the stream:\n\n```js\ns0.freq.set('100 200 300 400')\ns0.amp.set(0.5)\ns0.pan.saw()\n```\n\n### Shorthand\n\nUse a `#` prefix instead of `sig` for simpler code:\n\n```js\ns0.set({ inst: 'zmod', patch: 'sine(#freq).amp(#amp).pan(#pan)' })\ns0.freq.set('100 200 300 400')\ns0.amp.set(0.5)\ns0.pan.saw()\ns0.e.every(4)\n```\n\n### Notes\n\nUse `#n` for note values wherever you would supply a frequency. It will automatically convert midi note numbers to Hz:\n\n```js\ns0.set({ inst: 'zmod', patch: 'sine(#n).amp(0.5).pan()' })\ns0.n.set('Ddor%16..*16')\ns0.e.every(1)\n```\n\n### Envelopes\n\nUse `#e` to create an envelope, which will be triggered by the stream's `e` parameter:\n```js\ns0.set({ inst: 'zmod', patch: 'sine(#n).amp(#e).pan()'})\ns0.n.set('Ddor%16..*16')\ns0.e.set('3:8')\n```\n\nThis automatically maps the `a`, `d`, `s`, and `r` parameters to the envelope's attack, decay, sustain, and release times:\n```js\ns0.set({ inst: 'zmod', patch: 'sine(#n).amp(#e).pan()'})\ns0.n.set('Ddor%16..*16')\ns0.a.set('100')\ns0.d.set('100')\ns0.s.set('0.5')\ns0.r.set('1000')\ns0.e.set('3:8')\n```\n\nNeed more envelopes? Use `#e1`, `#e2`, etc. to create additional envelopes. These map to `a1`, `d1`, `s1`, `r1`, and `a2`, `d2`, `s2`, and `r2`, etc.\n```js\nconst patch = `\n  saw(#n).amp(#e).pan()\n    .reverb(0.75,5000)\n    .lpf(#e1.scale(50,5000),.9)\n`\n\ns0.set({ inst: 'zmod', patch, a: 10, a1: 500, s1:0.1, r1:0})\ns0.n.set('Ddor%8..*16')\ns0.e.set('3:8')\n```\n\n### Using busses\nZMod supports routing signals to and from busses, allowing you to create complex patches with multiple signal paths. Use the `bus` method to route a signal to a bus, and the `bus` function to retrieve a signal from a bus. You can also route audio from non-ZMod instruments to a bus, for use in ZMod patches.\n```js\ns0.set({\n  inst: 1, bank: 'bd', // play a kick drum\n  bus0: 1, // route to bus 0\n})\ns0.e.set('3:8')\n\n// use the bus to modulate frequency and filter cutoff\nlet patch = `\nsaw(#n.add(bus(0).follow().scale(10,500)))\n  .amp(#e)\n  .dist()\n  .lpf(bus(0).follow().scale(1000,5000))\n  .pan()\n`\ns1.set({inst: 'zmod', patch, n: 36, s: 1, a: 50, dur: $(4).btms()})\ns1.e.every(16)\n```\n\n## API\nThere are two main types of signal in ZMod: `ControlSignal` and `AudioSignal`. `ControlSignals`, including LFOs and Envelopes, can usually be passed to any `AudioSignal` method where a number is expected.\n\n### Signals\n\n`sig(value: number): ControlSignal`\n\nCreates a new `ControlSignal` with the specified value.\n\n#### Signal Operators \n\nThese methods can be applied to a `ControlSignal`, and passed one or more `number` arguments:\n\n```ts\nControlSignal.fn(...args: number[]): ControlSignal\n```\n\nAvailable functions:\n\n* `abs`\n* `add`\n* `mul`\n* `sub`\n* `gt` // greater than\n* `greaterthanzero`\n* `negate`\n* `gaintoaudio`\n* `audiotogain`\n* `pow`\n* `scale`\n* `scaleexp`\n\n```ts\nsine(lfo(0.5,100,200).multiply(2))\n```\n\n### LFOs\nGenerates a `ControlSignal` that oscillates between the specified minimum and maximum values at the specified frequency.\n```ts\n(frequency: ControlSignal, min: number = 0, max: number = 1): ControlSignal\n```\n\n* `lfo`\n* `lfosine`\n* `lfotri`\n* `lfosquare`\n* `lfosaw`\n\n### Envelope\nCreates a `ControlSignal` controlled by an ADSR envelope (all time values in milliseconds).\n\n```ts\nadsr(attack?: number, decay?: number, sustain?: number, release?: number): ControlSignal\n```\n\n```ts\nsine(100).amp(adsr())\n```\n\nEnvelopes must be triggered from outside the patch. See Basic Usage above.\n\n### Oscillators\n\n#### Basic Waveforms\nAll oscillators generate an `AudioSignal` at the specified frequency. The frequency can be a `ControlSignal` or a number.\n\n```ts\n(freq: ControlSignal = 220): AudioSignal\n```\n\n* `sine`\n* `tri`\n* `square`\n* `saw`\n\n```ts\nsine(100)\n```\n\n#### FM Oscillators\nFrequency Modulation (FM) oscillators allow for complex timbres by modulating the frequency of a carrier wave with another signal. The `harm` parameter controls the harmonicity ratio (pitch relationship between the two oscillators), and `modi` controls the modulation index (amplitude of the modulator oscillator).\n\n```ts\n(freq: ControlSignal = 220, harm: ControlSignal = 1, modi: ControlSignal = 1): AudioSignal\n```\n\n* `fm`\n* `fmsine`\n* `fmtri`\n* `fmsquare`\n* `fmsaw`\n\n```ts\nfmsaw(\n    100,\n    lfosaw(0.5,0.5,10),\n    lfosine(0.25,1,10)\n)\n```\n\n#### AM Oscillators\nAmplitude Modulation (AM) oscillators modulate the amplitude of a carrier wave with another signal. The `harm` parameter controls the harmonicity ratio, similar to FM oscillators.\n\n```ts\n(freq: ControlSignal = 220, harm: ControlSignal = 1): AudioSignal\n```\n\n* `am`\n* `amsine`\n* `amtri`\n* `amsquare`\n* `amsaw`\n\n```ts\nfmsaw(\n    lfosaw(0.125,100,1000),\n    lfosaw(0.5,0.5,10),\n    lfosine(0.25,1,10)\n)\n```\n\n#### Pulse\nA pulse wave is a square wave with a variable duty cycle, controlled by the `width` parameter (0 to 1). A width of 0.5 produces a standard square wave.\n\n```ts\npulse(freq: ControlSignal, width: ControlSignal): AudioSignal\n```\n```ts\npulse(100, 0.5)\n```\n\n#### PWM\nPulse Width Modulation (PWM) oscillators modulate the width of a pulse wave with another signal, typically an LFO. The `modFreq` parameter controls the frequency of the modulation.\n```ts\npwm(freq: ControlSignal, modFreq: ControlSignal): AudioSignal\n```\n\n```ts\npwm(100, lfo(0.125,0.5,2))\n```\n\n#### Fat Oscillators\nFat oscillators are designed to produce a richer sound by combining multiple oscillators. The `spread` parameter controls the detuning between the oscillators, creating a thicker sound.\n\n```ts\n(freq: ControlSignal = 220, spread: number = 10): AudioSignal\n```\n\n* `fat`\n* `fatsine`\n* `fattri`\n* `fatsquare`\n* `fatsaw`\n\n### Noise\nNoise generators from bright to dark:\n\n```ts\n(): AudioSignal\n```\n\n* `white`\n* `pink`\n* `brown`\n\n### Modifiers\n\n#### amp\n```ts\nAudioSignal.amp(value: ControlSignal): Gain\n```\n\nControls the amplitude of the signal. The value can be a `ControlSignal` or a number.\n\n```ts\nsine(100).amp(lfo())\n```\n\n### Filters\nControl the frequency content of the signal. All filters take a `frequency` parameter, which can be a `ControlSignal` or a number. The `q` parameter controls the resonance, and `rolloff` controls the filter's roll-off rate.\n\n```ts\nsaw(100).lpf(lfo(0.5,100,2000), 0.5, '12')\n```\n\n#### hpf\nHigh-pass filter.\n\n```ts\nAudioSignal.hpf(frequency?: ControlSignal, q?: ControlSignal, rolloff?: FilterRollOff): AudioSignal\n```\n\n\n#### lpf\nLow-pass filter.\n\n```ts\nAudioSignal.lpf(frequency?: ControlSignal, q?: ControlSignal, rolloff?: FilterRollOff): AudioSignal\n```\n\n\n#### bpf\nBand-pass filter.\n\n```ts\nAudioSignal.bpf(frequency?: ControlSignal, q?: ControlSignal, rolloff?: FilterRollOff): AudioSignal\n```\n\n\n#### fbf\nFeedback comb filter.\n\n```ts\nAudioSignal.fbf(delayTime?: ControlSignal, resonance?: ControlSignal): AudioSignal\n```\n\n\n### Effects\n\n#### reverb\nReverb effect.\n\n```ts\nAudioSignal.reverb(wet?: ControlSignal, decay?: ControlSignal): AudioSignal\n```\n\n\n#### delay\nFeedback delay effect.\n\n```ts\nAudioSignal.delay(wet?: ControlSignal, delayTime?: ControlSignal, feedback?: ControlSignal): AudioSignal\n```\n\n\n#### dist\nDistortion effect.\n\n```ts\nAudioSignal.dist(wet?: ControlSignal, distortion?: ControlSignal): AudioSignal\n```\n\n\n#### chorus\nChorus effect.\n\n```ts\nAudioSignal.chorus(wet?: ControlSignal, frequency?: ControlSignal, feedback?: ControlSignal, depth?: ControlSignal): AudioSignal\n```\n\n\n### Metering\n\n#### follow\nEnvelope follower. In this example, we use the amplitude of the signal in the left channel to modulate the pitch of signal in the right channel.\n\n```ts\nstack(\n    sine(100).amp(lfo()).out(0),\n    sine(out(0).follow().multiply(1000).add(100)).amp(0.5).out(1),\n)\n```\n\n### Routing\n\n#### pan\n```ts\nAudioSignal.pan(value?: ControlSignal): AudioSignal\n```\n\nStereo panner. Values between 0 and 1. Converts the signal to stereo.\n\n```ts\nfm(100).pan(lfo())\n```\n\n#### input\n```ts\nAudioSignal.input(index: number): AudioSignal\n```\n\nRoutes the signal from an input. Due to the limitation of the Web Audio API, only the first two inputs on your audio device are available.\n\n```ts\ninput(0)\n```\n\n#### bus\nWhen used as method, routes the signal to a bus.\n```ts\nAudioSignal.bus(index: number): AudioSignal\n```\n\nWhen used as a function, routes the signal from a bus. A 10ms delay is applied to prevent feedback.\n```ts\nbus(index: number): AudioSignal\n```\n\n### Recording\n\n#### loop\nA looper - needs a separate chapter as it's such a useful feature! \n```ts\nAudioSignal.loop(gain: ControlSignal, length: ControlSignal, rate: ControlSignal, clear: ControlSignal): AudioSignal\n```\n\n```ts\ns0.patch.set(`\n  fm(#_n)\n    .amp(#e)\n    .pan(lfo())\n    .loop(#record,#length,#rate,#clear)\n`)\ns0.record.set('0') // 0 stops recording\ns0.length.set('4') // in beats\ns0.rate.set('1') // buffer speed - 1 is normal speed, 0.5 is half speed, 2 is double speed, negative numbers are reverse. Best to manipulate when recording is off\ns0.clear.set(0) // 1 clears the loop\ns0._n.set('Ddor%16..?*16')\ns0.e.every(7).or(every(5))\ns0.m.not(s0.e)\n```\n",V=`
# Q5.js

Write Q5.js code to control visuals rendered on the canvas. See [https://q5js.org/home/](https://q5js.org/home/) for documentation and examples. Set the \`.canvas\` property on one or more streams to control their visual output.
\`\`\`js
s0.canvas.set(\`
  let size = 20, dx = width/size, dy = height/size;
  for (let x = 0; x < width; x += dx)
    for (let y = 0; y < height; y += dy) {
      stroke(noise((frameCount+(x*100))*.01)*100);
      strokeWeight(noise((frameCount+(y*100))*.01)*50);
      point(x - width/2, y - height/2);
    }
\`)
s0.e.set(1)
\`\`\`

Use stream parameters within your Q5.js code by prefixing them with \`#\`:
\`\`\`js
s0.canvas.set(\`
  stroke(255)
  strokeWeight(100)
  point(0, (height - (height/36) * (#n - 36)) - halfHeight)
\`)
s0.set({inst:0,cut:0})
s0.n.random(36,72).step(1)
s0.e.every(2)
s0.e.set(1)
\`\`\`

`,J={intro:M,getting_started:Z,the_editor:P,patterns:_,streams:D,mini_notation:U,mutations:E,zen_quantum:G,instruments:R,effects:L,custom_samples:O,zmod:X,q5js:V,global_settings:B,midi:W,utilities:Y,data:Q,clocks:H,modes:N},$=Object.entries(J).map(([e,t])=>({title:z(e),slug:I(e),markdown:t}));var K=u('<meta name="description" content="Learn how to make music with Zen, a musical live coding language that runs in your browser."/>'),ee=u('<li class="svelte-yrycp"> <a class="chapter svelte-yrycp"> </a></li>'),te=u('<section class="content svelte-yrycp"><div class="content__inner svelte-yrycp"><h1>Learn</h1> <nav><ul class="svelte-yrycp"></ul></nav></div></section>');function ue(e){var t=te();q(o=>{var n=K();x.title="Zen | Learn",l(o,n)});var c=a(t),d=p(a(c),2),m=a(d);j(m,5,()=>$,C,(o,n,g)=>{let b=()=>f(n).slug,y=()=>f(n).title;var i=ee(),h=a(i);h.nodeValue=`${g+1}. `;var r=p(h),w=a(r,!0);s(r),s(i),S(()=>{T(r,"href","/learn/"+b()),k(w,y())}),l(o,i)}),s(m),s(d),s(c),s(t),l(e,t)}export{ue as component,le as universal};
