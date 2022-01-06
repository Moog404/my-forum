import AppPopup from "../templates/AppPopup";
import Comments from "./Comments";
import {createRef, useState} from "react";
import axios from "axios";
import eventBus from "../../modules/event-bus";
import Posts from "./Posts";
import UserCard from "../organisms/UserCard";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const AppLayout = () => {

  const [post, setPost] = useState('')

  const loginUsername: React.RefObject<any> = createRef();
  const loginPassword: React.RefObject<any> = createRef();

  const registerUsername: React.RefObject<any> = createRef();
  const registerEmail: React.RefObject<any> = createRef();
  const registerPassword: React.RefObject<any> = createRef();
  const registerFirstName: React.RefObject<any> = createRef();
  const registerLastName: React.RefObject<any> = createRef();


  const login = () => {
    axios.post('http://localhost:3000/login', {username: loginUsername?.current.firstChild.value, password: loginPassword?.current.firstChild.value})
      .then(e => {
        if(e.status === 201) {
          localStorage.setItem('access_token', e.data.access_token);
          eventBus.dispatch('popup', {id: 'login'});
          eventBus.dispatch('login', {});
        }
      })
      .catch(e => console.log(e))
  }

  const register = () => {
    axios.post('http://localhost:3000/register',
{
        username: registerUsername?.current.firstChild.value,
        email: registerEmail?.current.firstChild.value,
        password: registerPassword?.current.firstChild.value,
        firstName: registerFirstName?.current.firstChild.value,
        lastName: registerLastName?.current.firstChild.value,
    }
  )
      .then(e => {
        if(e.status === 201) {
          eventBus.dispatch('popup', {id: 'register'});
        }
      })
      .catch(e => console.log(e))
  }

  return (
    <div className={"relative h-full min-h-0"}>

      {/* Login  */}

      <AppPopup id={"login"} content={
        <div className={"flex flex-col gap-y-5 w-[300px]"}>
          <div className={"text-3xl text-indigo-600 text-center font-black"}>Se connecter</div>
          <div ref={loginUsername}>
            <Input placeholder={"Login"} />
          </div>
          <div ref={loginPassword}>
            <Input placeholder={"Password"} />
          </div>
          <div className={"flex flex-col"} onClick={() => login()}>
            <Button content={"Se connecter"} modifier={"primary"} />
          </div>
        </div>
      } />

      {/* Register  */}


      <AppPopup id={"register"} content={
        <div className={"flex flex-col gap-y-5 w-[300px]"}>
          <div className={"text-3xl text-indigo-600 text-center font-black"}>Nous rejoindre</div>
          <div ref={registerUsername}>
            <Input placeholder={"Login"} />
          </div>
          <div ref={registerEmail}>
            <Input placeholder={"Email"} />
          </div>
          <div ref={registerPassword}>
            <Input placeholder={"Password"} />
          </div>
          <div ref={registerFirstName}>
            <Input placeholder={"FirstName"} />
          </div>
          <div ref={registerLastName}>
            <Input placeholder={"LastName"} />
          </div>
          <div className={"flex flex-col"}  onClick={() => register()}>
            <Button content={"S'inscrire"} modifier={"primary"} />
          </div>
        </div>
      } />

      <div className={"h-full bg-slate-900 grid grid-cols-4"}>
        <div className={"col-span-1 pl-16 pr-4 pt-10 flex flex-col gap-y-3 overflow-auto"}>
          <Posts onSelect={(e: string) => setPost(e)} />
        </div>
        <div className={"col-span-2 min-h-0 border-x-2 border-slate-800 pt-10 px-4 pb-10"}>
          <Comments id={post} />
        </div>
        <div className={"col-span-1 flex flex-col justify-center items-center pt-10 px-4"}>
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default AppLayout;