import React from "react"
import { SocketProvider } from "./context/SocketContext"
import { MapPage } from "./pages/MapPage"

function MapApp() {

  return (
    <SocketProvider>
      <MapPage />
    </SocketProvider>
  )
}

export default MapApp
