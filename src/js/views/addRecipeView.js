
import View from "./View";
import icons from 'url:../../img/icons.svg' // Parcel 2
// Perform ingredient validation in view before submiting the form
//improve recipe ingredient input - allow more than six ingredients

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload')
    _message = 'Your Recipe was successfully added :)'

    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor(){
        super()
        this.addHandlerShowWindow()
        this.addHandlerCloseindow()
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }
    

    addHandlerShowWindow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }
    
    
    addHandlerCloseindow(){
        
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault()
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr)
            handler(data)

        })
    }

    _generateMarkup(){
        
    }

}

export default new AddRecipeView()
