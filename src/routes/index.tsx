import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/')({
    component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Rate My Slippi</h3>
    </div>
  )
}