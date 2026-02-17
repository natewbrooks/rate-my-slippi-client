import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClientProvider, QueryClient, useQueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'
import { HomeFooter } from '../components/home/footer'

export const Route = createRootRoute({
    component: RootComponent,
})


function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app-wrapper" className={`flex flex-col w-full h-full justify-center items-center bg-darkest`}>
        <div id="layout" className={`w-full h-full flex flex-col justify-between max-w-xl overflow-hidden`}>
            <Outlet />
        </div>
      </div>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </QueryClientProvider>
  )
}