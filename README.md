# bparallax

### What is this?

A library for giving a parallax scrolling effect to elements (div, img, video etc).

<p style="color: rgba(0,0,0,0.4)">Please help the development by reporting any bugs. Also feel free to contribute to this project. Thanks ❤</p>

### Example

![Parallax scroll example](readme/example.gif "Parallax scroll example")

### Benefits

- Extremely lightweight: Only 2.9kB (1.1kB gzipped)
- No dependency: It's all Pure javascript
- Ultra smooth: Uses CSS3 Transform. So it can utilize the GPU and hardware acceleration for smooth animation

### CDN

```
<script src="https://unpkg.com/bparallax/src/bparallax.js">
```

And then use it like this:

```
<img class="parallax-element" src='...'>
```

```
new BoxParallaxScroll().init();
```

### NPM Installation

```
npm i bparallax
```

And then use it like this:

```
<img class="parallax-element" src='...'>
```

```
import BoxParallaxScroll from 'bparallax';

new BoxParallaxScroll().init();
```

### Options

```
BoxParallaxScroll({
  identifier: ".parallax-element", // <- Default & Optional
  strechFactor: 1 // <- Default & Optional
}).init();
```

- identifier: [string][optional]
  \- Identify which elements should be parallaxed
- strechFactor: [int][optional] [>0]
  \- How much the element should be parallaxed with the scroll

### To get the examples image effect

```
/* Use this for the images you want to parallax */
.parallax-element{
  object-fit: cover;
}
```
