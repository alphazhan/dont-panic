# Don't Panic! — Exo

## Project Overview

**Exo** is an immersive 3D educational game centered around exoplanet exploration and science.

### Plot

It's the year 2984, and Earth has become uninhabitable due to severe global pollution. NASA has launched a competition to discover a new exoplanet that could serve as humanity's new home. As a player, your mission is to find a habitable exoplanet with the help of your spaceship "Marvin."

### Gameplay

In Exo, you’ll investigate a selection of exoplanets, similar to the deduction elements found in games like Among Us. Out of the ten exoplanets, two are potentially habitable, while the others cannot support life. Your goal is to analyze each exoplanet’s data—including attributes like mass, distance from its host star, and surface temperature—to determine if it meets the requirements for habitability. Equipped with Marvin’s capabilities, you’ll gather data, make observations, and take notes to make informed guesses. Once you make a decision about a planet's habitability, the game will reveal if your assessment was correct. It will also provide an explanation to help you understand the factors that influence an exoplanet’s potential to support life. This gameplay loop helps players learn from their choices and spot patterns in different exoplanets, guiding them to better understand which planets might support life.

But the adventure doesn’t end there! Imagine talking to exoplanets as if they were unique characters. In Exo, each exoplanet has distinct 4 personalities: playful, funny, angry, and sad. Using a Large Language Model (LLM), players can chat with these planets. By associating each exoplanet’s “mood” with its characteristics and unique circumstances, players leverage associative learning to enrich their exploration. These conversations add depth to the research process and help players form hypotheses about each exoplanet’s habitability. One may even try to guess whether an exoplanet is habitable based on its chat style.

### Project Background

Exo was developed as part of the 2024 NASA Space Apps Challenge (Hackathon), where our team tackled the _Chronicles of Exoplanet Exploration_ challenge.

## Tech Stack

The game was crafted using the following _Sveltish_ technologies:

- **SvelteKit** (with Svelte **4** & Typescript): core framework.
- **Threlte 7** (with Three.js): 3D web framework in Svelte.
- **Flowbite Svelte** (with TailwindCSS): Svelte UI components.

As for chatting with exoplanets, we leveraged a free **Google's Gemini AI**.

## Key Features

1. Exoplanet Science Exploration – In-depth, scientifically accurate facts about various exoplanets.
2. AI-Based Exoplanet Conversations – Engage in interactive chats with exoplanets, and even personalize the experience with a custom **Gemini API key**.
3. Atmospheric Space Soundtrack – Enjoy a music space soundtrack that enhances the mood and immerses players in the vastness of space.

## Quick Start

1. Run `pnpm i` to install dependencies.
2. Run `pnpm dev` to launch the game in development mode.

**Warning: Avoid minifying in Vite during the build process!**

## Resources & Links

- [NASA Space Apps Challenge 2024 Team Page](https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/dont-panic/?tab=project)
