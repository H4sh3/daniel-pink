---
layout: '@/templates/BasePost.astro'
title: Genetic Rocket
description: Inspired by Space-X starship's landing maneuver. This program simulates a rocket that learns to land after a few generations of training.
pubDate: 2020-04-22T00:00:00Z
imgSrc: '/assets/images/projects/genetic-rocket.png'
imgAlt: 'Image post'
---

This genetic algorithm runs multiple versions of slightly different behaving rockets.

After each iteration the rocket that had the smallest velocity on impact is selected.

The selected rocket is then used to generate copies with minor changes that will influence its behavior.

It can take some iterations to find a rocket that lands smoothly.

<div class="flex flex-col">
    <a href="https://projects.daniel-pink.de/genetic-rocket" target="_blank">Live Demo</a>
    <a href="https://github.com/H4sh3/genetic-rocket" target="_blank">Code</a>
</div>