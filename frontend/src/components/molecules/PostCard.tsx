import {useState} from "react";
import {useDeletePostMutation} from "../../store/rtk/posts";

interface Props {
  id: string,
  name: string,
  description: string,
  messages: number
  onSelect: (arg0: string) => void;
}

const PostCard = (props: Props) => {

  const [hover, setHover] = useState(false)
  const hoveredClasses = hover ? 'bg-slate-700 shadow-slate-700/50 shadow-lg' : 'bg-slate-800';

  const [deletePost] = useDeletePostMutation()

  return (
    <div className={`rounded-xl w-full py-3 px-4 flex gap-x-6 items-center cursor-pointer transition ${hoveredClasses}`}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className={"bg-green-600 w-2.5 h-2.5 rounded-full shadow-lg shadow-green-600/50"} />
      <div onClick={() => props.onSelect(props.id)} className={"flex flex-col flex-1"}>
        <div className={"font-bold text-slate-50"}>
          { props.name }
        </div>
        <div className={"font-light text-slate-200"}>
          { props.description }
        </div>
      </div>
      <div onClick={() => deletePost({id: props.id})} className={"text-white cursor-pointer"}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </div>
  )
}

export default PostCard;