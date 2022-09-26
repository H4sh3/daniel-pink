---
layout: '@/templates/BasePost.astro'
title: Boids
description: Simple agents that observe their nearby neighbors and behave on simple rules.
pubDate: 2022-09-26T00:00:00Z
imgSrc: '/assets/images/projects/boids.png'
imgAlt: 'Image post'
---

<div class="flex flex-row justify-between">
    <a href="https://projects.daniel-pink.de/boids" target="_blank">Live Demo</a>
    <a href="https://github.com/H4sh3/boids-swarm" target="_blank">Code</a>
</div>

---

### Description

In 1986 Craig Reynolds simulated the flocking behaviour of birds.
He came up with a simulation of so called "boids" that get controlled by 3 simple rules
Each rules takes in concerne the boids close to it self.

### The rules
<img src="/assets/images/projects/boids-rules.png">

### Implementation
This implementation is done via p5js and javascript.

The influence (range) of each rule can be adjusted by changing slider values.

This will change the behavior of the boids.