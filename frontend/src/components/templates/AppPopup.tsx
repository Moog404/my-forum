import {ReactElement, useState} from "react";
import eventBus from "../../modules/event-bus";

interface Props {
  content: ReactElement,
  id: string
}

const AppPopup = (props: Props) => {

  let [isOpen, setIsOpen] = useState(false)

  eventBus.on('popup', (data: any) => {
    if(data.id === props.id) {
      setIsOpen(!isOpen)
    }
  });

  return (
    <div className={`fixed inset-0 z-10 bg-black/30 justify-center items-center ${isOpen ? 'flex' : 'hidden'}`}>
      <div className={"max-w-3xl bg-white px-6 py-10 rounded-lg shadow-lg shadow-slate-300/50"}>
        { props.content && <div>{props.content}</div> }
      </div>
      <div className={"inset-0 absolute z-[-10]"} onClick={() => setIsOpen(false)} />
    </div>
  )
}

export default AppPopup