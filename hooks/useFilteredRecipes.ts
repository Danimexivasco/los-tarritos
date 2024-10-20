import { Recipe, RecipesFilters } from "@/types";
import { INITIAL_RECIPES_FILTERS_VALUES } from "@/utils/constants";
import { useEffect, useState } from "react";

export const useFilteredRecipes = (recipes: Array<Recipe>) => {
  const [ results, setResults ] = useState(recipes);
  const [ showFilters, setShowFilters ] = useState(false)
  const [ filters, setFilters ] = useState<RecipesFilters>(INITIAL_RECIPES_FILTERS_VALUES)
  const [ tempfilters, setTempFilters ] = useState<RecipesFilters>(INITIAL_RECIPES_FILTERS_VALUES)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempFilters({ ...tempfilters, [ e.target.name ]: e.target.value })
  }

  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFilters(tempfilters)
  }

  const resetFilters = () => {
    setFilters(INITIAL_RECIPES_FILTERS_VALUES)
    setTempFilters(INITIAL_RECIPES_FILTERS_VALUES)
  }

  useEffect(() => {
    const matches = recipes.filter(recipe => {
      const searchMatch = filters.search
        ? recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          recipe.tags?.toLowerCase().includes(filters.search.toLowerCase())
        : true;
  
      const timeMatch = filters.time
        ? parseInt(recipe?.time?.toString() ?? "10000") <= parseInt(filters.time)
        : true;
  
      const difficultyMatch = filters.difficulty
        ? recipe.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
        : true;
  
      return searchMatch && timeMatch && difficultyMatch;
    });
    setResults(matches)
  }, [ filters, recipes ])

  return {
    filteredRecipes: results,
    showFilters,
    setShowFilters,
    tempfilters,
    handleChange,
    applyFilters,
    resetFilters
  }
}