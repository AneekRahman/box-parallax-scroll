# BoxParallaxScroll

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/bparallax.svg
[npm-url]: https://npmjs.org/package/bparallax
[downloads-image]: https://img.shields.io/npm/dm/bparallax.svg
[downloads-url]: https://npmjs.org/package/bparallax

### What is this?

A library for giving a parallax scrolling effect to elements (div, img, video etc). Simply add the default class `.parallax-element` or set your own `identifier: '.your-class'` to any element you want to parallax.

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

### NPM Installation

```
npm i bparallax
```

### Usages

Your parallax elements:

```
<img class="parallax-element" src='...'>
// or
<video class="parallax-element">
  <source src="...">
</video>
// or
<div class="parallax-element" style="background-image: url(...)">
```

Then in javascript:

```
// If you use the CDN
BoxParallaxScroll().init();
```

```
// If you use NPM or a Framework
import BoxParallaxScroll from 'bparallax';

BoxParallaxScroll().init();
```

### Options

```
// Default values
BoxParallaxScroll({
  identifier: ".parallax-element",
  strechFactor: 0.2
}).init();
```

- `identifier`: [string]
  - Identify which elements should be parallaxed
- `strechFactor`: [float] [0 to 1]
  - Strength of parallax / How much the element should be parallaxed with the scroll. Can be any value from 0 to 1

### Under the hood

BoxParallaxScroll creates a wrapper with the class `.wrapper` and sets the parallaxable element as it's child.

### Achieve the shown example gifs effect

```
/* Use this for the images you want to parallax */
.parallax-element{
  object-fit: cover; // Fixes image ratio
}
```
