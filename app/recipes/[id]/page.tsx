import RecipeForm from "@/components/recipeForm"
import React from "react"

interface RecipeDetailProps {
  params: {
    id: string
  }
}
const RecipeDetail = ({ params: { id } }: RecipeDetailProps) => <RecipeForm id={id} />

export default RecipeDetail