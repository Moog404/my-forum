import {createRef} from "react";

interface Props {
  placeholder: string,
  onSubmit: (arg0: string) => void,
}

const inputAdd = (props: Props) => {

  const search: React.RefObject<any> = createRef();

  return (
    <div className="relative w-full">
      <input ref={search} type="text" className={'w-full bg-slate-300 text-slate-800 rounded-lg py-5 px-4 shadow-lg shadow-slate-600/50'} placeholder={props.placeholder} />
      <div onClick={() => { props.onSubmit(search?.current.value); search.current.value = ''}}  className={'bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition w-12 h-12 rounded-lg absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center justify-center text-white'}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
        </svg>
      </div>
    </div>
  )
}

export default inputAdd;