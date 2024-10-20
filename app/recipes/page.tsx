import Headline from "@/components/headline"
import RecipesList from "@/components/recipesList"
import React from "react"

const Recipes = ({}) => (
  <>
    <Headline as="h1" classname="mb-8 mt-4">Recipes</Headline>
    <RecipesList />
  </>
)

export default Recipes