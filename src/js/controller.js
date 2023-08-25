import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config'
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import PaginationView from './views/paginationView.js'
import BookmarkView from './views/bookmarkView.js'
import addRecipeView from './views/addRecipeView.js'


import 'core-js/stable'
import 'regenerator-runtime/runtime'
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
//console.log(icons)

if(module.hot){
  module.hot.accept()
}

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//console.log('TEST')


const controlRecipes = async function(){

  try{


    const id = window.location.hash.slice(1)
    //console.log(id)

    if(!id) return
    recipeView.renderSpinner()

    //0. Update Result View to mark selected Search result
    resultsView.update(model.getSearchResultPage())
    
    
    //1. Loading Recipe
    await model.loadRecipe(id)
    // const {recipe} = model.state
    
    // 2. Rendering REcipe
    //console.log(model.state.recipe)
    recipeView.render(model.state.recipe)
    
    //add data to Bookmark
    bookmarkView.update(model.state.bookmark)
  } catch(err) {
    recipeView.renderError()
      console.error(err)
    }
}

const controlSearchResult = async function(){
  try{

    resultsView.renderSpinner()

    // Get Search Query
    const query = searchView.getQuery()
    if(!query) return
    
    // Load Search results
    await model.loadSearchResults(query)

    // Render results
    //17.8.23
    //resultsView.render(model.state.search.results)
    //17.8.23
    resultsView.render(model.getSearchResultPage())

    //Render the initial pagination button
    paginationView.render(model.state.search)

  }catch (err){
    console.log(err)
  }
}

const controlPagination = function(goToPage){
    // Render New results
    resultsView.render(model.getSearchResultPage(goToPage))

    //Render the pagination button
    paginationView.render(model.state.search)

}


const controlServings = function (newServings){
  //update the recipe servings (in state)
  model.updateServings(newServings)

  //update the recipe
  recipeView.update(model.state.recipe)
}


const controlAddBookmark = function (){
  //1) Add/Remove Bookmarks
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)
  
  recipeView.update(model.state.recipe)

  bookmarkView.render(model.state.bookmark)
}

const controlBookmark = function(){
  bookmarkView.render(model.state.bookmark)
}

const controlAddRecipe = async function(newRecipe){
  try{
    //Show that the data is loading
    addRecipeView.renderSpinner()

    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)

    //REnder Recipe
    recipeView.render(model.state.recipe)

    //Success Message
    addRecipeView.renderMessage() 

    //Render the Bookmark
    bookmarkView.render(model.state.bookmark)

    //Change ID in url
    window.history.pushState(null, '', `${model.state.recipe.id}`)

    //Close form Window
    setTimeout(function(){
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000) 

  }catch(err){
    console.error('@@@', err)
    addRecipeView.renderError(err.message)
  }
  // console.log(newRecipe)
}

const newFeature = function(){
  console.log("Welcome to the Applciation")
}

const init = function(){
  bookmarkView.addHandlerRender(controlBookmark)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
  newFeature()
}
init()