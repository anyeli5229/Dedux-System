import { Head } from "@inertiajs/react"
import PricingTable from "../Transactions/components/PricingTable"
import AppLayout from "../Layouts/AppLayout"

export default function Plans() {
  return (
    <>
        <Head title="Planes"/>

        <AppLayout>
            <PricingTable/>
        </AppLayout>
    </>
  )
}
