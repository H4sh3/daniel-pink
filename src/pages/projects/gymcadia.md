---
layout: '@/templates/BasePost.astro'
title: Gymcadia
description: Full-stack development of a fitness app, where users can create, perform, share and track workouts.
pubDate: 2021-09-22T00:00:00Z
imgSrc: '/assets/images/projects/gymcadia.png'
imgAlt: 'Image post 4'
---


<h2>About</h2>

I had the idea for this app in mid 2021 and started developing right away.

Most fitness app's are behind a pay wall or use a subscription model, gymcadia is intended as a free and community driven alternative.

Users can create, perform, share and track workouts, without the need of a monthly subscription.

<a href="https://gymcadia.com" target="_blank">Link to web app</a>


<h2>Tech Stack</h2>

<div class="underline font-bold">
Frontend
</div>
Nextjs/React application using tailwindcss for styling and zustand.js for state management.

<div class="underline font-bold">
Backend
</div>
The backend's rest api is written in python and uses the falcon asgi webserver for fast request handling.

<div class="underline font-bold">
Database
</div>
Workouts, users, follower-following relations are stored in a PostgreSQL database.

<div class="underline font-bold">
Caching
</div>
The deserialization of many workouts was slower then expected so i added a redis for caching.

This way, requesting many workouts is much faster.

Only downside is that cache invalidation is a difficulty task but it works great so far.

