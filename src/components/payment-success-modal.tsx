"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { Modal } from "@/components/ui/modal"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import confetti from "canvas-confetti"

export const PaymentSuccessModal = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const { data, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get()
      return await res.json()
    },
    refetchInterval(query) {
      return query.state.data?.plan === "PRO" ? false : 1000
    },
  })

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#284189", "#4B76C9", "#87A7DB", "#C3D3ED"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handClose = () => {
    setIsOpen(false)
    router.push("/dashboard")
  }

  useEffect(() => {
    if(isPaymentSuccessful && isOpen) triggerConfetti()
  })

  const isPaymentSuccessful = data?.plan === "PRO"

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handClose}
      className="mx-6 pt-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful
          ? <div className="flex flex-col items-center justify-center h-64">
            <LoadingSpinner className="mb-4" />
            <p className="text-lg/7 font-medium text-gray-900">
              Upgrading your account...
            </p>
            <p className="text-gray-600 text-sm/6 mt-2 text-center">
              Please wait while we process your upgrade. This may take a moment.
            </p>
          </div>
          : <>
            <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
              <img
                src="/brand-asset-heart.png"
                className="h-full w-full object-cover"
                alt="Payment success"
              />
            </div>
            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 tracking-tight font-medium text-pretty">Upgrade successful!</p>
              <p className="text-gray-600 text-sm/6 text-balance">
                Thank you for upgrading to Pro and supporting PandaFlow. Your account has been upgraded.
              </p>
            </div>
            <div className="mt-8 w-full">
              <Button onClick={handClose} className="w-full">
                <CheckIcon className="size-5" /> Go to Dashboard
              </Button>
            </div>
          </>
        }
      </div>
    </Modal>
  )
}