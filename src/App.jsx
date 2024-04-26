import { useEffect, useState } from "react"
import { db } from "./utils/firebase"
import { onValue, ref } from "firebase/database"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import logo from "./assets/logo.png"

function App() {
  const [datos, setDatos] = useState()
  const [actividad, setActividad] = useState("NORMAL")
  const [clientes, setClientes] = useState([])

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
      // console.log("Datos >", datos)
      const clientesFiltrados = Object.values(datos.clientes)
      setClientes(clientesFiltrados)
      // console.log("Clientes filrados >", clientesFiltrados)

      const actividadActualizada = datos.actividad.status
      setActividad(actividadActualizada)
      // console.log("Actividad actualizada >", actividadActualizada)
    }
  }, [datos])

  useEffect(() => {
    const toastAlert = () => {
      toast.error(`ALERTA en CFE-001`, {
        theme: "colored",
      })
    }

    if (actividad == "ALERTA") {
      toastAlert()
    }
  }, [actividad])

  const sendAlert = async () => {
    console.log("Clientes > ", clientes)
    const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send"
    for (let token of clientes) {
      let data = {
        to: token,
        // "title": title,
        body: "ALERTA cfe-001",
        sound: "default",
        priority: "high",
      }

      fetch(PUSH_ENDPOINT, {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((err) => console.log(err))
    }
  }

  // toast.error("SENSORES ACTIVADOS", {
  //   position: "bottom-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   transition: "Bounce",
  // })

  return (
    <>
      <div className="flex flex-col items-start w-full h-AUTO text-slate-900  py-5">
        <ToastContainer autoClose={false} />
        {/* <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        <div className="flex items-end h-[12%] w-full  bg-tr px-10">
          <img className="h-[70px]" src={logo} />
        </div>
        <div className="flex justify-start items-start mx-10 mt-10 ">
          <div className="flex items-center">
            <p className="text-[1.5rem] text-slate-500 mr-5">Dispositivo:</p>
            <p className="text-[1.5rem] text-green-700">cfe-001</p>
          </div>
        </div>

        <div className="flex justify-start items-start mx-10 mt-5 ">
          <div className="flex items-center">
            <p className="text-[1.2rem] text-slate-500 mr-5">Actividad:</p>
            <p className="text-[1.2rem] text-green-700">{actividad}</p>
          </div>
        </div>

        <div className="flex  mx-10 mt-5">
          <button
            onClick={sendAlert}
            className="bg-amber-600 w-40 h-8 rounded-md text-white shadow-md border-0 hover:bg-opacity-90"
          >
            Enviar alerta
          </button>
        </div>

        <div className="flex justify-start items-start mx-10 mt-10 ">
          <div className="flex items-center">
            <p className="text-[1.2rem] text-slate-500 mr-5">
              Clientes registrados:{" "}
            </p>
            <div className="flex flex-col items-start">
              {clientes.length > 0
                ? clientes.map((cliente, index) => (
                    <div key={index}>
                      <p className="text-[1rem] text-green-700">{cliente}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
