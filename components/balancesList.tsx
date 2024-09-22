"use client"
import { useBalancesData } from "@/services/balances"
import React, { useEffect, useState } from "react"
import Link from "./link"
import { getPath } from "@/utils/getPath"
import { Balance, YearlyBalances } from "@/types"
import Card from "./card"
import { formatDate } from "@/utils/formatDate"
import { getDate } from "@/utils/getDate"

const BalancesList = ({}) => {
  const [ balances, loading, error, snapshot ] = useBalancesData()
  const [ balancesWithIds, setBalancesWithIds ] = useState<Array<Balance>>([]);
  const [ yearlyBalances, setYearlyBalances ] = useState<YearlyBalances>({});

  useEffect(() => {
    if (balances && Array.isArray(balances)) {
      const _balancesWithIds = balances?.map((balance, index) => {
        return { id: snapshot?.docs[ index ].id, ...balance };
      });
      setBalancesWithIds(_balancesWithIds)
    }
  }, [ balances, snapshot?.docs?.length ])

  useEffect(() => {
    if (balancesWithIds) {
      setYearlyBalances(groupBalancesByYear(balancesWithIds))
    }
  }, [ balancesWithIds ])

  useEffect(() => {
    if (yearlyBalances && Object.keys(yearlyBalances).length > 0) {
      const lastBalance = Object.entries(yearlyBalances)?.sort(([ key ], [ key2 ]) => Number(key2) - Number(key))?.[ 0 ]?.[ 1 ]?.[ 0 ] ?? null

      sessionStorage.setItem("lastBalance", JSON.stringify(lastBalance))
    }
  }, [ yearlyBalances ])

  const  groupBalancesByYear = (balances: Array<Balance> | null) => {
    if (!balances) return {};
    const balancesByYear: { [key: number]: Array<Balance> } = {};
  
    balances.forEach(balance => {
      if (balance.date) {
        const date = getDate(balance.date);
        const year = date?.getFullYear();

        if (year) {
          if (!balancesByYear[ year ]) {
            balancesByYear[ year ] = [];
          }
          balancesByYear[ year ].push(balance);
        }
      }
    });
    return balancesByYear
  }

  if (loading) {
    <p>Loading...</p>
    
  }
  return balances?.length <= 0 ? (
    <>
      <p className="mb-4">Ooops... There are no balances yet</p>
      <Link
        href={getPath("New Balance")}
        asButton
      >Create your first balance</Link>
    </>
  ) : (
    <>
      <Link
        href={`${getPath("New Balance")}`}
        className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white my-8"}
      >NEW BALANCE ➕</Link>
      {Object.entries(yearlyBalances)
        ?.sort(([ key ], [ key2 ]) => Number(key2) - Number(key))
        ?.map(([ key, items ]) => (
          <div key={key} data-key={key} className="my-10">
            <h2 className="font-bold pb-2 uppercase text-lg">{key}</h2>
            <hr className="border-cyan-500/40 pb-6"/>
            <ul className="grid gap-4 md:grid-cols-3">
              {items
                ?.sort((item1: Balance, item2: Balance) => (getDate(item2.date)?.getTime() ?? 2) - (getDate(item1.date)?.getTime() ?? 1))
                ?.map((balance: Balance) => {
                  const title = formatDate(getDate(balance.date ?? undefined), "es-ES", {
                    month: "long",
                  })
                  const isPositive = balance.points.good.length > balance.points.bad.length
                  const isNegative = balance.points.good.length < balance.points.bad.length
                  return (
                    <Card
                      key={balance.id}
                      title={title ?? ""}
                      href={getPath("Edit Balance", balance.id)}
                      description={balance.description ?? ""}
                      isBalance
                      isPositive={isPositive}
                      isNegative={isNegative}
                      points={balance.points}
                      createdAt={balance.createdAt}
                    />
                  )
                })}
            </ul>
          </div>
        ))
      }
    </>
  )
}

export default BalancesList