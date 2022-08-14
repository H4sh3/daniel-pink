---
layout: '@/templates/BasePost.astro'
title: Machine learning Maze (Q-Table)
description: Implementation of an machine learning algorithm, were an agent has to find a goal in an maze.
pubDate: 2019-06-31T00:00:00Z
imgSrc: '/assets/images/projects/rl-maze.png'
imgAlt: 'rl-maze.png'
---


<div class="flex flex-row justify-between">
    <a href="https://projects.daniel-pink.de/rl-maze" target="_blank">Live Demo</a>
    <a href="https://github.com/H4sh3/rl-maze" target="_blank">Code</a>
</div>

---

<h2>Description</h2>
Implementation of an machine learning algorithm, were an agent has to find a goal in an maze.

To choose the right actions an Q-Table is used to rate each action on a field.

After a few rounds of random exploration, the Q-Table can be used to find the quickest way to reach the goal.

In version 2 the agent has to find a key to open a door that blocks the way to the key, the key can be thought of as an extra dimension in the Q-Table.

