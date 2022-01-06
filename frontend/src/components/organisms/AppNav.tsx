import eventBus from "../../modules/event-bus";
import {useEffect, useState} from "react";
import Button from "../atoms/Button";

const AppNav = () => {

  const [logged, setLogged] = useState(false);
  eventBus.on('login', () => setLogged(true));

  useEffect(() => {
    if(localStorage.getItem('access_token')) {
      setLogged(true)
    }
  }, [])

  return (
    <div>
      <div className={"h-20 bg-slate-800 w-full shadow-md flex justify-between px-16 items-center"}>
        <div />
        { !logged &&
          <div className={"flex gap-x-4"}>

            <div onClick={() => eventBus.dispatch('popup', {
              id: 'register'
            })}>
              <Button modifier={"primary"} content={"Nous Rejoindre"} />
            </div>

            <div onClick={() => eventBus.dispatch('popup', {
              id: 'login'
            })}>
              <Button modifier={"secondary"} content={"Se connecter"} />
            </div>

          </div>
        }
        { logged &&
          <div className={"text-white flex gap-x-4"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <button onClick={() => {localStorage.removeItem('access_token'); window.location.reload()}} className={"bg-pink-600 text-white font-bold px-3 min-w-[80px] rounded-lg shadow-md shadow-pink-600/50 py-1.5 text-sm"}>Déconnexion</button>
          </div>
        }
      </div>
    </div>
  )
}

export default AppNav;