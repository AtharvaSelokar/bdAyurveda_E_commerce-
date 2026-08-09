import { Suspense } from "react";

import OrderSuccessContent from "./OrderSuccessContent";

function OrderSuccessLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[var(--green-soft)] border-t-[var(--green)]" />

        <p className="mt-4 text-sm text-[var(--muted)]">
          Loading your order...
        </p>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}