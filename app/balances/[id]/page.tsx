import React from "react"
import BalanceForm from "@/components/balanceForm"

interface BalanceDetailProps {
  params: {
    id: string
  }
}

const BalanceDetail = ({ params: { id } }:BalanceDetailProps) => <BalanceForm id={id} />

export default BalanceDetail