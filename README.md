# AI filter Movie Night Demo

Choose a movie for your movie night using a natural language query. **Try it out [here](https://ai-filter-movie-night.vercel.app/)!**

### Overview

This is a demo of using LLM ([OpenAI](https://openai.com/) GPT models) and [TypeChat](https://microsoft.github.io/TypeChat/) to create an AI filter that fulfills the following requirements:

- An index page that lists all the movies in `/json/movies.json` (assume this is something from a database)
- A movie details page that displays some information about the selected movie
- An "AI-powered" search that takes a natural language query and translates it to a set of filters to narrow down the results shown in the table.

The site is created using Next, React, TypeScript, and Tailwind.

### Deployment
TypeChat requires an OpenAI API key, and this should be set in your `.env.local` file.
