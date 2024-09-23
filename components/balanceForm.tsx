"use client"
import React, { useContext, useEffect, useRef, useState } from "react"
import { BALANCE_INPUTS, CANCEL_BTN_CLASSES, CONFIRM_BTN_CLASSES, DELETE_BTN_CLASSES, INITIAL_POINT_VALUES } from "@/utils/constants"
import { renderFormFields } from "@/utils/renderFormFields"
import { UserContext } from "./protectedRoute"
import { Balance, Point } from "@/types"
import { createBalance, deleteBalance, updateBalance, useSingleBalanceData } from "@/services/balances"
import Input from "./input"
import Button from "./button"
import BalanceItem from "./balanceItem"
import Link from "./link"
import { getPath } from "@/utils/getPath"
import { showMsg } from "@/utils/showMessage"
import { useRouter } from "next/navigation"
import { generateId } from "@/utils/idGenerator"
import { formatDate } from "@/utils/formatDate"
import { getDate } from "@/utils/getDate"
import { combine } from "@/utils/combineClassNames"
import Headline from "./headline"

interface BalanceForm {
  id?: string
}

const BalanceForm = ({ id }: BalanceForm) => {
  const isEdit = Boolean(id)
  const { user } = useContext(UserContext);
  const router = useRouter()
  const [ balance, loading, error ] = useSingleBalanceData(id ?? "editando123")
  const [ formData, setFormData ] = useState<Balance>({
    date: formatDate(new Date(), "en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    points: {
      good: [],
      bad: []
    },
    description: "",
    createdAt: new Date(),
    createdBy: user?.email ?? "🤷‍♂️",
  })
  const [ addedPoints, setAddedPoints ] = useState({ good: INITIAL_POINT_VALUES, bad: INITIAL_POINT_VALUES })
  const goodPointRef = useRef<HTMLInputElement>(null)
  const badPointRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (balance && typeof balance === "object" && "date" in balance) {
      const _balance = { ...balance, date: formatDate(getDate(balance?.date), "en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) }
      setFormData({ ..._balance as Balance })
    }
  }, [ balance ])

  useEffect(() => {
    const lastBalance = sessionStorage.getItem("lastBalance")
    if (lastBalance) {
      const _lastBalance = JSON.parse(lastBalance)
      setFormData({ ...formData, points: { ...formData.points, bad: [ ...formData.points.bad, ..._lastBalance?.points?.bad?.map((point: Point) => ({ ...point, isFromPreviousBalance: true })) ]  } })
    }
  }, [])

  const handleAddedPoint = (type: "good" | "bad") => {
    if (addedPoints[ type ]?.text === "") {
      return showMsg("Please add a point", "error")
    }
    setFormData({
      ...formData,
      points: { ...formData.points,
        [ type ]: [ ...formData.points[ type ], { ...addedPoints[ type ], id: generateId() } ] }
    })
    setAddedPoints({ ...addedPoints, [ type ]: INITIAL_POINT_VALUES })
  }

  const handleRemovePoint = (id: string, type: "good" | "bad") => {
    if (!type || !id) return
    setFormData({ ...formData, points: { ...formData.points, [ type ]: formData.points[ type ].filter(point => point.id !== id) } })
  }

  const handleEditPoint = (id: string, type: "good" | "bad") => {
    if (!type || !id) return
    setAddedPoints({ ...addedPoints, [ type ]:  formData.points[ type ].find(point => point.id === id) })
    setFormData({ ...formData, points: { ...formData.points, [ type ]: formData.points[ type ].filter(point => point.id !== id) } })
    type === "good" ? goodPointRef.current?.focus() : badPointRef.current?.focus()
  }

  const handleSolvePoint = (id: string) => {
    if (!id) return
    const targetPoint = formData.points.bad.find(point => point.id === id)
    delete targetPoint?.isFromPreviousBalance
    if (targetPoint) {
      setFormData({
        ...formData,
        points: { ...formData.points,
          bad: formData.points.bad.filter(point => point.id !== id),
          good: [ ...formData.points.good, targetPoint ] }
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [ e.target.name ]: e.target.value })
  }

  const removeBalance = async () => {
    await deleteBalance(id ?? "no existe 123")
    router.push(getPath("Balances"))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.points.good.length === 0 && formData.points.bad.length === 0) {
      return showMsg("Please add at least one point", "error")
    }
    if (isEdit) {
      const _formData = { ...formData, date: getDate(formData.date) }
      await updateBalance(id ?? "", _formData)
      router.push(getPath("Balances"))
      return
    } else {
      const _formData = { ...formData, date: getDate(formData.date) }
      await createBalance(_formData)
      router.push(getPath("Balances"))
    }
  }

  if (loading) return <p>Loading...</p>
  // TODO: Refactor this component
  return (
    <>
      <div className="flex justify-between items-center mb-10 mt-4 gap-4">
        <Headline as="h2">{isEdit ? "Edit Balance": "New Balance"}</Headline>
        {isEdit &&
          <Button
            text="🗑 DELETE"
            type="button"
            onClick={removeBalance}
            className={combine(DELETE_BTN_CLASSES, "w-fit")}
          />
        }
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6 md:mb-14">
          {renderFormFields(BALANCE_INPUTS, formData, handleChange)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x mb-16">
          <div className="py-8 md:py-0 pr-0 md:pr-8">
            <Headline as="h3" classname="text-2xl pb-4">Good points</Headline>
            <div className="grid gap-2 mb-6">
              <Input
                ref={goodPointRef}
                type="text"
                value={addedPoints.good.text}
                onChange={(e) => setAddedPoints({ ...addedPoints, good: { ...addedPoints.good, text: e.target.value } })}
                placeholder="Add your point here..."
                className="w-full border-2 border-emerald-500/30 focus:border-emerald-500"
              />
              <Button
                text="Add +"
                type="button"
                onClick={() => handleAddedPoint("good")}
                className="bg-emerald-600 hover:bg-emerald-700 shadow-gray-400 hover:shadow-none"
              />
            </div>
            <ul className="grid gap-1">
              {formData.points?.good?.map(({ id, text, isFromPreviousBalance = false }) => (
                <BalanceItem
                  key={id}
                  text={text}
                  isGood
                  isFromPreviousBalance={isFromPreviousBalance}
                  onRemove={() => handleRemovePoint(id, "good")}
                  onEdit={() => handleEditPoint(id, "good")}
                  onSolve={() => handleSolvePoint(id)}
                />
              ))}
            </ul>
          </div>
          <div className="py-8 md:py-0 pl-0 md:pl-8">
            <Headline as="h3" classname="text-2xl pb-4">Bad points</Headline>
            <div className="grid gap-2 mb-6">
              <Input
                ref={badPointRef}
                type="text"
                value={addedPoints.bad.text}
                onChange={(e) => setAddedPoints({ ...addedPoints, bad: { ...addedPoints.bad, text: e.target.value } })}
                placeholder="Add your point here..."
                className="w-full border-2 border-red-500/30 focus:border-red-500"
              />
              <Button
                text="Add +"
                type="button"
                onClick={() => handleAddedPoint("bad")}
                className="bg-red-700 hover:bg-red-800 shadow-gray-400 hover:shadow-none"
              />
            </div>
            <ul className="grid gap-1">
              {formData.points?.bad?.map(({ id, text, isFromPreviousBalance = false }) => (
                <BalanceItem
                  key={id}
                  text={text}
                  isFromPreviousBalance={isFromPreviousBalance}
                  onRemove={() => handleRemovePoint(id, "bad")}
                  onEdit={() => handleEditPoint(id, "bad")}
                  onSolve={() => handleSolvePoint(id)}
                />
              ))}
            </ul>
          </div>
        </div>
        <Button
          text={isEdit ? "Update Balance" : "Create Balance"}
          type="submit"
          className={CONFIRM_BTN_CLASSES}
        />
        <Link
          href={getPath("Balances")}
          asButton
          className={CANCEL_BTN_CLASSES}
        >Cancel</Link>
      </form>
    </>
  )
}

export default BalanceForm