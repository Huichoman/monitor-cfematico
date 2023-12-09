import { useEffect, useState } from "react"
import { db } from "./utils/firebase"
import { onValue, ref } from "firebase/database"
import { ToastContainer, toast } from "react-toastify"

import "./App.css"

import logo from "./assets/logo.png"

function App() {
  const [datos, setDatos] = useState()
  const [actividad, setActividad] = useState("Normal")
  const [clientes, setClientes] = useState([])

  const notify = () => toast("Wow so easy !")

  useEffect(() => {
    const query = ref(db, "cfe-001/")
    return onValue(query, (snapshot) => {
      const data = snapshot.val()

      if (snapshot.exists()) {
        setDatos(data)
      }
    })
  }, [])

  useEffect(() => {
    if (datos) {
      console.log("Datos >", datos)
      const clientesFiltrados = Object.values(datos.clientes)
      setClientes(clientesFiltrados)
      console.log("Clientes filrados >", clientesFiltrados)

      const actividadActualizada = datos.actividad
      setActividad(actividadActualizada)
      console.log("Actividad actualizada >", actividadActualizada)
    }
  }, [datos])

  useEffect(() => {
    if (actividad == "Golpe detectado") {
      alert("Golpe detectado")
    }
  }, [actividad])

  return (
    <>
      <div className="flex flex-col items-start w-[100%] h-[90vh] text-slate-900 border">
        <div className="w-[200px]">
          <ToastContainer
            position="bottom-center"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
          />
        </div>

        <div className="flex items-end h-[12%] w-full border bg-tr px-10">
          <img className="h-[70px]" src={logo} />
        </div>
        <div className="flex justify-start items-start mx-10 mt-10 ">
          <div className="flex items-center">
            <p className="text-[1.5rem] text-slate-500 mr-5">Dispositivo:</p>
            <p className="text-[1.5rem] text-green-700">cfe-001</p>
          </div>
        </div>

        <div className="flex justify-start items-start mx-10 mt-10 ">
          <div className="flex items-center">
            <p className="text-[1.2rem] text-slate-500 mr-5">Actividad:</p>
            <p className="text-[1.2rem] text-green-700">{actividad}</p>
          </div>
        </div>

        <div className="flex justify-start items-start mx-10 mt-10 ">
          <div className="flex items-center">
            <p className="text-[1.2rem] text-slate-500 mr-5">
              Clientes registrados:{" "}
            </p>
            <div className="flex flex-col items-start">
              {clientes.map((cliente, index) => (
                <p key={index} className="text-[1rem] text-green-700">
                  {cliente}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
