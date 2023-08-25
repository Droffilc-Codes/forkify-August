import View from "./View";
import icons from 'url:../../img/icons.svg' // Parcel 2
import previewView from "./previewView";

class ResultView extends View {
    _parentElement = document.querySelector('.results')
    _errorMessage = `No Recipes found for your query. Please try again`
    _message = ` `
    

    _generateMarkup(){
        return this._data.map(result=> previewView.render(result, false)).join('')

    }

}

export default new ResultView()
//resultsView.js
