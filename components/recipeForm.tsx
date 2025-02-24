"use client"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./protectedRoute";
import Link from "./link";
import Button from "./button";
import { CANCEL_BTN_CLASSES, CONFIRM_BTN_CLASSES, DELETE_BTN_CLASSES, RECIPE_DIFFICULTIES, RECIPES_INPUTS } from "@/utils/constants";
import { getPath } from "@/utils/getPath";
import Headline from "./headline";
import { combine } from "@/utils/combineClassNames";
import TrashIcon from "@/public/icons/trash.svg";
import { renderFormFields } from "@/utils/renderFormFields";
import { Recipe } from "@/types";
import { isValidURL } from "@/utils/isValidURL";
import { createRecipe, deleteRecipe, updateRecipe, useSingleRecipeData } from "@/services/recipes";
import { useRouter } from "next/navigation";
import { showMsg } from "@/utils/showMessage";
import { sendEmail } from "@/utils/sendEmail";
import { getDate } from "@/utils/getDate";

interface RecipeForm {
  id?: string
}

const RecipeForm = ({ id }: RecipeForm) => {
  const isEdit = Boolean(id)
  const { user } = useContext(UserContext);
  const router = useRouter()
  const [ recipe, loading, error ] = useSingleRecipeData(id ?? "editando123")
  const [ formData, setFormData ] = useState<Recipe>({
    title: "",
    difficulty: RECIPE_DIFFICULTIES[ 0 ],
    ingredients: "",
    tags: "",
    time: null,
    url: "",
    instructions: "",
    createdAt: new Date(),
    createdBy: user?.email ?? "🤷‍♂️",
  })
  const [ showUrlLink, setShowUrlLink ] = useState(false)

  useEffect(() => {
    if (recipe ) {
      setFormData({ ...recipe as Recipe })
    }
  }, [ recipe ])

  useEffect(() => {
    if (formData?.url) {
      console.log("formData", formData);
      isValidURL(formData.url) ? setShowUrlLink(true) : setShowUrlLink(false)
    }
  }, [ formData?.url ])

  const removeRecipe = async () => {
    if (!id) return
    await deleteRecipe(id)
    router.push(getPath("Recipes"))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [ e.target.name ]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      try {
        await updateRecipe(id as string, { ...formData, updatedAt: new Date() })
        await sendEmail({
          actor: user?.email,
          subject: `Los tarritos🏺 - A recipe have been updated by ${user?.email}`,
          message: `A recipe have been updated by <strong>${user?.email}.</strong><br/><br/>
          <strong>Date:</strong>${getDate(formData.createdAt)}<br/><br/>
          <strong>Dificulty:</strong> ${formData.difficulty}<br/><br/>
          <strong>Time:</strong> ${formData.time} mins<br/><br/>
          <strong>Title:</strong> <strong>${formData.title}</strong><br/><br/>
          <strong>Instructions:</strong> ${formData.instructions}<br/><br/>
          Take a look on it here: ${window.location.origin}${getPath("Recipes")}`,
        })
      } catch  {
        showMsg("Error updating the recipe", "error")
      }
    } else {
      try {
        await createRecipe(formData)
        await sendEmail({
          actor: user?.email,
          subject: `Los tarritos🏺. A recipe have been created by ${user?.email}`,
          message: `A recipe have been created by <strong>${user?.email}.</strong><br/><br/>
          <strong>Date:</strong>${getDate(formData.createdAt)}<br/><br/>
          <strong>Dificulty:</strong> ${formData.difficulty}<br/><br/>
          <strong>Time:</strong> ${formData.time} mins<br/><br/>
          <strong>Title:</strong> <strong>${formData.title}</strong><br/><br/>
          <strong>Instructions:</strong> ${formData.instructions}<br/><br/>
          Take a look on it here: ${window.location.origin}${getPath("Recipes")}`,
        })
      } catch {
        showMsg("Error creating the topic", "error")
      }
    }
      
    showMsg(isEdit ? "Recipe updated": "Recipe created", "success")
    router.push(getPath("Recipes"))
  }
  return (
    <>
      <div className="flex justify-between items-center mb-10 mt-4 gap-4">
        <Headline as="h2">{isEdit ? "Edit Recipe": "New Recipe"}</Headline>
        <div className="grid sm:flex gap-2">
          {isEdit &&
          <Button
            icon={<TrashIcon className="w-5 h-5"/>}
            text="Delete"
            type="button"
            onClick={removeRecipe}
            className={combine(DELETE_BTN_CLASSES, "!w-fit uppercase")}
          />
          }
          {showUrlLink && <Link href={formData.url ?? "#"} asButton>Visit recipe</Link>}
        </div>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6 md:mb-14">
          {renderFormFields(RECIPES_INPUTS, formData, handleChange)}
        </div>
        <Button
          text={isEdit ? "Update Recipe" : "Create Recipe"}
          type="submit"
          className={CONFIRM_BTN_CLASSES}
        />
        <Link
          href={getPath("Recipes")}
          asButton
          className={CANCEL_BTN_CLASSES}
        >Cancel</Link>
      </form>
    </>
  )
}

export default RecipeForm