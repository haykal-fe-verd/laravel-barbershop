import { router } from "@inertiajs/react";

function handlPayment(snapToken: string) {
    window.snap.pay(snapToken, {
        onSuccess: function (result: any) {
            router.get(route("success"), {
                order_id: result.order_id,
                payment_type: result.payment_type,
                status_code: result.status_code,
                transaction_status: result.transaction_status,
            });
        },

        onPending: function (result: any) {
            router.get(route("success"), {
                order_id: result.order_id,
                payment_type: result.payment_type,
                status_code: result.status_code,
                transaction_status: result.transaction_status,
            });
        },

        onClose: function () {
            router.visit(route("transaction.user"));
        },

        onError: function (result: any) {
            console.log("🚀  error ==>", result);
            console.log("error", result);
        },
    });
}

export default handlPayment;
