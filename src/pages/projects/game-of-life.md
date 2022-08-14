---
layout: '@/templates/BasePost.astro'
title: Game of life
description: Conway's game of life implemented in javascript using p5.js.
pubDate: 2021-04-29T00:00:00Z
imgSrc: '/assets/images/projects/game-of-life.png'
imgAlt: 'Image post'
---

<div class="flex flex-row justify-between">
    <a href="https://projects.daniel-pink.de/game-of-life" target="_blank">Live Demo</a>
    <a href="https://github.com/H4sh3/game-of-life" target="_blank">Code</a>
</div>

---

The grid gets updated by the following rules:
1. Cells with less then 2 neighbours die
2. A dead cell with 3 live neighbours becomes alive
3. Cells with more then 3 neighbours die