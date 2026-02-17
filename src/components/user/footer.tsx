import React, { useState } from "react"
import { Drawer } from "vaul"

type DrawerMode = "rate" | "compare" | null

export const UserFooter = () => {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DrawerMode>(null)

  const openDrawer = (nextMode: DrawerMode) => {
    setMode(nextMode)
    setOpen(true)
  }

  return (
    <>
      <div className="flex gap-1 w-full h-[42px] text-white">
        <button
          onClick={() => openDrawer("rate")}
          className="bg-red flex-1 text-5xl hover:opacity-80 cursor-pointer"
        >
          RATE
        </button>

        <button
          onClick={() => openDrawer("compare")}
          className="bg-red flex-1 text-5xl hover:opacity-80 cursor-pointer"
        >
          COMPARE
        </button>
      </div>

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60" />

          <Drawer.Content className="fixed bottom-0 left-1/2 -translate-x-1/2 z-60 rounded-t-2xl bg-neutral-900 p-6 w-xl h-2/3">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-neutral-600" />

            {mode === "rate" && <RateDrawer />}
            {mode === "compare" && <CompareDrawer />}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

const RateDrawer = () => {
  return (
    <div className="text-white">
      <h2 className="text-4xl mb-4">Rate Player</h2>
      <div className="opacity-70 text-5xl">Rating UI goes here</div>
    </div>
  )
}

const CompareDrawer = () => {
  return (
    <div className="text-white">
      <h2 className="text-4xl mb-4">Compare Players</h2>
      <div className="opacity-70">Comparison UI goes here</div>
    </div>
  )
}