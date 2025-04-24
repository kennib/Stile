# Stile code challenge

> Our latest unit, on evolution, will be a flagship for our burgeoning USA market. Not only is it a key point of curriculum coverage that we’re lacking, it’s one that’s considered both controversial and critical to scientific literacy. Therefore, it’s important to our mission to impart a clear and deep understanding of the scientific concepts involved.

> You’ve been hired to participate in a competition to design and create a working prototype of one such simulation for our evolution unit. It must demonstrate the concepts of *random variation* and *natural selection* central to evolution.

## Ideas Brainstorm

- What challenges are there for students who come from a culture skeptical of evolution?
  - Modern creationists talk about macro vs micro evolution (in reality, they are same thing over different time periods)
  - Is plant evolution a way to avoid some of the bad pre-conceptions?
- Can we create something physically simulated in a classroom that can be translated into a digital simulation?
  - Where's Wally for moth patterns or flowers or something
  - Evolving a LEGO car
  - Creating animals that could be animated using the Meta AI cartoon animation open source library
- A .io game (like agar.io or snake.io)
- What if instead of visualising a simulation over time, we visualised generations in a branching pattern?
- Could we use Lindenmayer-systems to generate organisms to be evolved?
- Could we use AI to allow students and teachers to come up with ideas for random variations and selection pressures?

## Selected idea

The idea is for a student to create a plant (trees, bushes, flowers, grasses, etc) that can be evolved using reproduction, a selection of random variations and random selection pressures.

The students can play forward an initial plant.
Maybe this could even be integrated with units on plant biology where the students could design their own plant.

Under the hood the plants would be made of Lindemayer systems.
The plants could have stats that are determined by their form that affect how they are survive and reproduce after experiencing environmental events (climate, predators, disasters, etc).

### The prototype

- Simple L system
- Simple stats
  - Food (nitrogen) required/gathered
  - Water required/gathered
  - Resilience to wind
- Reproduction with random variation
- Random selection pressure events
- Simple visual tree of population over time

- Stretch goal
  - Adding custom variations and selection events