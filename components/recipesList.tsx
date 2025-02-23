"use client"
import { useRecipesData } from "@/services/recipes"
import Link from "./link"
import { getPath } from "@/utils/getPath"
import PlusIcon from "@/public/icons/plus.svg"
import { Recipe } from "@/types"
import Headline from "./headline"
import { combine } from "@/utils/combineClassNames"
import { ITEMS_GAP, RECIPES_FILTERS } from "@/utils/constants"
import RecipeCard from "./cards/recipeCard"
import { useRecipesWithIds } from "@/hooks/useRecipesWithIds"
import FiltersIcon from "@/public/icons/filters.svg"
import { renderFormFields } from "@/utils/renderFormFields"
import Button from "./button"
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes"

const RecipesList = ({}) => {
  const [ recipes, loading, error, snapshot ] = useRecipesData()
  const recipesWithIds = useRecipesWithIds(recipes, snapshot)
  const {
    filteredRecipes,
    showFilters,
    setShowFilters,
    tempfilters,
    handleChange,
    applyFilters,
    resetFilters
  } = useFilteredRecipes(recipesWithIds)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong, try again in a few minutes...</p>
  return recipes.length > 0 ? (
    <>
      <Link
        href={`${getPath("New Recipe")}`}
        className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full lg:w-fit flex items-center justify-center rounded p-4 text-white my-8 md:w-fit"}
      ><PlusIcon className="w-5 h-5 mr-2"/> NEW RECIPE </Link>
      <section className="mb-10 p-3 rounded border-2  border-slate-800-40 shadow-md cursor-pointer">
        <div className="flex items-center justify-between" onClick={() => setShowFilters(!showFilters)}>
          <Headline as="h3">Filters</Headline>
          <FiltersIcon className="w-6 h-6"/>
        </div>
        <div className={combine("mt-4", showFilters ? "" : "hidden")}>
          <hr className="border-slate-500/40 pb-4"/>
          <form className="grid gap-3 md:grid-cols-3 p-2" onSubmit={applyFilters}>
            {renderFormFields(RECIPES_FILTERS, tempfilters, handleChange)}
            <div className="grid gap-2 mt-2 md:flex md:col-start-3">
              <Button
                type="submit"
                text="Apply"
              />
              <Button
                type="button"
                text="Reset"
                onClick={resetFilters}
                className="bg-red-500 hover:bg-red-700"
              />
            </div>
          </form>
        </div>
      </section>
      <ul className={combine("grid md:grid-cols-3", ITEMS_GAP)}>
        {filteredRecipes?.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            href={getPath("Edit Recipe", recipe.id)}
            tags={recipe.tags}
            difficulty={recipe.difficulty}
            url={recipe.url}
            time={recipe.time}
            createdAt={recipe.createdAt}
          />
        ))}
      </ul>
    </>
  ) : (
    <>
      <p className="mb-4">Ooops... There are no recipes yet</p>
      <Link
        href={getPath("New Recipe")}
        asButton
        className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white"}
      >
        <PlusIcon className="w-5 h-5 mr-2"/>Add new recipe
      </Link>
    </>
  )
}

export default RecipesList