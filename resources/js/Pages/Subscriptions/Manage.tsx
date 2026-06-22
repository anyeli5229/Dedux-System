import AppLayout from "../Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import SubscriptionStatus from "../Transactions/components/subscriptions/SubscriptionStatus";
import { Subscription } from "@/types/subscription";
import SubscriptionDowngrade from "../Transactions/components/subscriptions/SubscriptionDowngrade";
import SubscriptionUpgrade from "../Transactions/components/subscriptions/SubscriptionUpgrade";
import SubscriptionCancellation from "../Transactions/components/subscriptions/SubscriptionCancellation";
import SubscriptionResume from "../Transactions/components/subscriptions/SubscriptionResume";

type ManageProps = {
    subscription: Subscription
}

const statusColors = {
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
};

export default function Manage({ subscription }: ManageProps) {
    const title = 'Administrar suscripción'
    const isYearly = subscription.plan === 'yearly'

    return (
        <AppLayout>
            <Head title={title} />

            <div className="max-w-2xl mx-auto my-12 px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">
                        Tu suscripción
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-base font-medium leading-relaxed">
                        Administra los detalles de tu plan, descarga tus facturas o gestiona tu método de pago de forma segura a través de Stripe.
                    </p>
                </div>

                <SubscriptionStatus
                    isYearly={isYearly}
                    price={subscription.price}
                    status_label={subscription.status_label}
                    color={statusColors[subscription.status_label.color]}
                />

                {subscription.on_grace_period ? (
                    <SubscriptionResume
                        ends_at={subscription.ends_at}
                    />
                ) : (
                    <>
                        {!isYearly &&
                            <SubscriptionUpgrade />
                            
                        }

                        {isYearly &&
                            <SubscriptionDowngrade
                                next_billing_date={subscription.next_billing_date}
                                ends_at={subscription.ends_at}
                            />
                        }
                        <SubscriptionCancellation
                            next_billing_date={subscription.next_billing_date}
                        />
                    </>
                )}
            </div>
        </AppLayout>
    )
}