import { useEffect, useState } from "react"
import { db } from "./utils/firebase"
import { onValue, ref } from "firebase/database"

import "./App.css"

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const query = ref(db, "cfe-001/clientes")
    return onValue(query, (snapshot) => {
      const data = snapshot.val()
      console.log("Clientes >", data)
      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setProjects((projects) => [...projects, project])
        })
      }
    })
  }, [])

  return (
    <>
      <div></div>
    </>
  )
}

export default App
