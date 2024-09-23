import BalancesList from "@/components/balancesList"
import Headline from "@/components/headline"
import React from "react"

const Balances = () => {
  return (
    <>
      <Headline as="h1" classname="mb-8 mt-4">Balances</Headline>
      <BalancesList />
    </>
  )
}

export default Balances