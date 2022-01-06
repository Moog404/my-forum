interface Props {
  content: string
}

const CommentCard = (props: Props) => {
  return (
    <div className={"p-4 rounded-lg bg-white shadow-lg shadow-slate-600/50 flex flex-col gap-y-2"}>
      { props.content && <div>{props.content}</div> }
      <div className={'flex justify-between'}>
        <div className={"flex gap-x-2.5 items-center"}>
          <img className={'rounded-full h-8 border-indigo-600 border-2'} src={"https://thispersondoesnotexist.com/image"} />
        </div>
        <div className={"text-pink-600 cursor-pointer"}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CommentCard;