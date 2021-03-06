var redux = require('redux');

console.log('Starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

// var stateDefault = {
//   name: 'Anonymous',
//   hobbies: [],
//   movies: []
// };

// var oldReducer = (state = stateDefault,action)=>{
//   //state = state || {name: 'Anonymous'};
//
//   switch (action.type){
//     case 'CHANGE_NAME':
//       return{
//         ...state,
//         name: action.name
//       };
//     case 'ADD_HOBBY':
//       return{
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: nextHobbyId++,
//             hobby: action.hobby
//           }
//         ]
//       };
//     case 'REMOVE_HOBBY':
//       return{
//         ...state,
//         hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
//       };
//     case 'ADD_MOVIE':
//       return {
//         ...state,
//         movies:[
//           ...state.movies,
//           {
//             id: nextMovieId++,
//             title: action.title,
//             genre: action.genre
//           }
//         ]
//       };
//       case 'REMOVE_MOVIE':
//       return{
//         ...state,
//         movies: state.movies.filter((movie) => movie.id !== action.id)
//       };
//     default:
//       return state;
//   }
// };

//Name reducer and action generator
//------------------
// var nameReducer = (state = 'Anonymous',action) => {
//   switch (action.type) {
//     case 'CHANGE_NAME':
//       return action.name;
//     default:
//       return state;
//   };
// };
//
// var changeName = (name) =>{
//   return {
//     type: 'CHANGE_NAME',
//     name: name
//   }
// };

//Hobbies reducer and action generator
//------------------
// var nextHobbyId = 1;
// var hobbiesReducer = (state = [],action) => {
//   switch (action.type){
//     case 'ADD_HOBBY':
//       return [
//         ...state,
//         {
//           id: nextHobbyId++,
//           hobby: action.hobby
//         }
//       ];
//     case 'REMOVE_HOBBY':
//       return state.filter((hobby) => hobby.id !== action.id)
//     default:
//       return state;
//   }
// };

// var addHobby = (hobby) =>{
//   return {
//     type: 'ADD_HOBBY',
//     hobby
//   };
// };
//
// var removeHobby = (id) =>{
//   return {
//     type: 'REMOVE_HOBBY',
//     id
//   };
// };

//Movies reducer and action generator
//------------------
// var nextMovieId = 1;
// var moviesReducer = (state = [],action) => {
//   switch (action.type){
//     case 'ADD_MOVIE':
//       return [
//         ...state,
//         {
//           id: nextMovieId++,
//           title: action.title,
//           genre: action.genre
//         }
//       ];
//     case 'REMOVE_MOVIE':
//       return state.filter((movie) => movie.id !== action.id)
//     default:
//       return state;
//   }
// };

// var addMovie = (title,genre) => {
//   return {
//     type: 'ADD_MOVIE',
//     title,
//     genre
//   }
// };
//
// var removeMovie = (id) => {
//   return {
//     type: 'REMOVE_MOVIE',
//     id
//   };
// };

//Map reducer and action generator
//------------------
// var mapReducer = (state = {isFetching:false,url:undefined},action) => {
//   switch(action.type){
//     case 'START_LOCATION_FETCH':
//       return {
//         isFetching: true,
//         url: undefined
//       }
//     case 'COMPLETE_LOCATION_FETCH':
//       return{
//         isFetching: false,
//         url: action.url
//       }
//     default:
//       return state;
//   }
// };

// var startLocationFetch = () => {
//   return {
//     type: 'START_LOCATION_FETCH'
//   };
// };
//
// var completeLocationFetch = (url) => {
//   return {
//     type: 'COMPLETE_LOCATION_FETCH',
//     url
//   };
// };
//
// var fetchLocation = () => {
//   store.dispatch(startLocationFetch());
//
//   axios.get('http://ipinfo.io').then(function (res) {
//     var loc = res.data.loc; //(ipinfo.io)"loc": "29.5073,-98.5747",
//     var baseUrl = 'http://maps.google.com?q=';
//
//     store.dispatch(completeLocationFetch(baseUrl + loc));
//   });
// };

// var reducer = redux.combineReducers({
//   name: nameReducer,
//   hobbies: hobbiesReducer,
//   movies: moviesReducer,
//   map: mapReducer
// });
//
// var store = redux.createStore(reducer,redux.compose(
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  // console.log('Name is', state.name);
  // document.getElementById('app').innerHTML = state.name;
  console.log('New state', store.getState());

  if(state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  }else if(state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>'
  }
});
//unsubscribe();

var currentState = store.getState();
console.log('currentState',currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('saji'));
//console.log('Name should be saji',store.getState());

store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.addHobby('Walking'));
store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName('Jack'));

store.dispatch(actions.addMovie('Mad Max','Action'));
store.dispatch(actions.addMovie('Star Wars','Action'));
store.dispatch(actions.removeMovie(1));
