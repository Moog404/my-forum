const UserCard = () => {
  return (
    <div className={"flex flex-col items-center"}>
      <img className={'w-[200px] h-[200px] rounded-lg shadow-lg shadow-slate-600/50'} src={"https://thispersondoesnotexist.com/image"} />
      <div className="text-white font-semibold text-3xl text-center mt-4">Lorem Ipsum</div>
      <div className={"bg-slate-800 w-full py-8 px-4 rounded-lg flex flex-col gap-y-6 mt-10 relative"}>

        <div className={"bg-indigo-600 shadow-lg shadow-indigo-600/50 absolute px-4 top-0 left-1/2 transform -translate-x-1/2 text-white -translate-y-1/2 py-2 rounded-lg"}>
          Rang <span className={"font-bold"}>Novice</span>
        </div>

        <div className={"flex gap-x-4 items-center"}>
          <div className={"bg-white w-14 h-14 rounded-lg flex items-center shadow-lg shadow-slate-600/50 justify-center text-indigo-600"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <div className={"text-xl font-semibold text-slate-100 text-center flex-1"}>0695509550</div>
          <div className={"w-12"}></div>
        </div>

        <div className={"flex gap-x-4 items-center"}>
          <div className={"bg-white w-14 h-14 rounded-lg flex items-center shadow-lg shadow-slate-600/50 justify-center text-indigo-600"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className={"text-xl font-semibold text-slate-100 text-center flex-1"}>lorem@ipsum.com</div>
          <div className={"w-12"}></div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;