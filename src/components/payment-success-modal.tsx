"use client";

import { useQuery } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { client } from "@/lib/client";

export const PaymentSuccessModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const { data, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get();
      return await res.json();
    },
    refetchInterval(query) {
      return query.state.data?.plan === "PRO" ? false : 1000;
    },
  });

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
    setIsOpen(false);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (isPaymentSuccessful && isOpen) triggerConfetti();
  });

  const isPaymentSuccessful = data?.plan === "PRO";

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handClose}
      className="mx-6 pt-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <LoadingSpinner className="mb-4" />
            <p className="font-medium text-gray-900 text-lg/7">
              Upgrading your account...
            </p>
            <p className="mt-2 text-center text-gray-600 text-sm/6">
              Please wait while we process your upgrade. This may take a moment.
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <img
                src="/brand-asset-heart.png"
                className="h-full w-full object-cover"
                alt="Payment success"
              />
            </div>
            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-pretty font-medium text-lg/7 tracking-tight">
                Upgrade successful!
              </p>
              <p className="text-balance text-gray-600 text-sm/6">
                Thank you for upgrading to Pro and supporting PandaFlow. Your
                account has been upgraded.
              </p>
            </div>
            <div className="mt-8 w-full">
              <Button onClick={handClose} className="w-full">
                <CheckIcon className="size-5" /> Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
