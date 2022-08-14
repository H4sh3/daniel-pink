---
layout: '@/templates/BasePost.astro'
title: Gravity
description: Simple visualization of Newton's law of gravitation
pubDate: 2022-06-4T00:00:00Z
imgSrc: '/assets/images/projects/gravity.png'
imgAlt: 'Image post 4'
---
<div class="flex flex-row justify-between">
    <a href="https://projects.daniel-pink.de/gravity" target="_blank">Live Demo</a>
    <a href="https://github.com/H4sh3/gravity" target="_blank">Code</a>
</div>
---
Each dot represents a planet that has a position,mass and velocity.

Every update cycle a planets velocity and position gets updated using the sum of attraction forces.

The center dot is static and doesn't move.
