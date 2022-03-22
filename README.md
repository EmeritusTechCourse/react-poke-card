# React Poke Card

_Grabbing onto React hooks._

## High Level Goals of this Sprint
* Become familiar with functional react.
* Apply hooks to control and manipulate your app.
* Leverage an API to populate your app with data based on the url string.

## Bare Minimum Requirements

Complete all the bare minimum requirements before moving on to the advanced content. This sprint gives you a substantial amount of creative freedom. We recommend that you read through all the requirements and hold a short planning session with your pair to discuss what your final product will be.

- [] Renders a Pokemon Card based on the query parameters in the address bar. Do not use react-router for this assignment. [See here](https://stackoverflow.com/questions/56111914/how-to-read-url-parameters-within-component-in-react-js) for one way that you could accomplish this.

- [X] Makes requests to the [PokeAPI](https://pokeapi.co/) to populate a Card of the Pokemon queried.

- [X] You can use fetch to make your api call or you may choose to incorporate a different library like [axios](https://axios-http.com/docs/intro)

- [X] Use `useEffect` and `useState` properly to establish appropriate state management.

- [X] The pokemon card should contain the pokemon's name, sprite, and any other at a glance information that may be beneficial. Play with the [PokeAPI](https://pokeapi.co/) interface to see what type of information is available for a pokemon.

- [] When the card is clicked, render the 'back' of the card with a full glimpse of information about that pokemon.

- [] Add your own style and flair to the page. Be creative.



A base repository built with Create-React-App has been provided for you.

## Advanced Content

Our advanced content is intended to throw you in over your head, requiring you to solve problems with very little support or oversight, much like you would as a mid or senior level engineer.

Feel free to experiment with other React features while tackling these. You may choose to do any or all of these in any order:

- [] Implement a side bar that shows all possible evolutions of the current pokemon(ie. 'charmander', 'charmeleon', 'charizard'). 
  - [] Each evolution should show a name and sprite as well as 
  - [] Make a clickHandler redirecting the user to the associated page for that pokemon.

- [] Add a navigation bar that allows the user to find other Pokemon.
  - [] Either implement a search feature that renders results on the current page.
  - [] Or display mini cards of randomly selected other pokemon.

## Relevant Documentation:

* [ReactJS](https://reactjs.org/docs/getting-started.html)
* [PokeAPI](https://pokeapi.co/) is a public RESTful API that can simulate what requests to any RESTful server would be like.
* [MDN fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
* [Axios](https://axios-http.com/docs/intro)

test push