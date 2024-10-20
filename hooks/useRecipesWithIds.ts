import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export function useRecipesWithIds(recipes: Recipe[], snapshot: QuerySnapshot<DocumentData, DocumentData>) {
  const [ recipesWithIds, setRecipesWithIds ] = useState<Recipe[]>([]);
  useEffect(() => {
    if (recipes && Array.isArray(recipes)) {
      const _balancesWithIds = recipes?.map((recipe, index) => {
        return { id: snapshot?.docs[ index ].id, ...recipe };
      });
      setRecipesWithIds(_balancesWithIds)
    }
  }, [ recipes, snapshot?.docs?.length ])

  return recipesWithIds
}