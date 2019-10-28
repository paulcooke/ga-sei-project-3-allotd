import React from 'react'
import axios from 'axios'

class VegetablesRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      recipeShow: false,
      recipeHide: true

    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    const veg = this.props.veg.typeOfVeg
    axios.post(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?q=${veg}`)
      .then(res => this.setState({ recipes: res.data.results }))
      .catch(err => console.log(err)) 
  }

  handleClick() {
    this.setState({ recipeShow: true })
  }

  handleClose() {
    this.setState({ recipeShow: false })
  }

  render() {
    console.log(this.state.recipes)
    if (!this.state.recipes) return null
    const { recipes } = this.state
    const fewerRecipes = recipes.slice(0, 3)
    const otherRecipes = recipes.slice(3, 10)

    return (
      <div>
        {fewerRecipes.map(recipe => (
          <label key={recipe.title}>
            
            <a href={recipe.href} rel="noopener noreferrer" target="_blank">
              <h3> ⭐️ {recipe.title}</h3>
              <p>{recipe.ingredients}</p>
            </a> 
          </label> 
        ))}
     
        {!this.state.recipeShow &&
        <div value={this.state.recipeShow}>
          <button onClick = {this.handleClick}>view more recipes...</button>
        </div>} 
        

        {this.state.recipeShow &&
        <div value={this.state.recipeShow}>
          {
            otherRecipes.map(recipe => (
              <label key={recipe.title}>
            
                <a href={recipe.href} rel="noopener noreferrer" target="_blank">
                  <h3> ⭐️ {recipe.title}</h3>
                  <p>{recipe.ingredients}</p>
                </a> 
              </label> 
            ))}
          <button onClick = {this.handleClose}>show less</button>
        </div>
        }
      </div>
            
    )
  }
}
  

export default VegetablesRecipe