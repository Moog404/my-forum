interface Props {
  placeholder: string
}

const Input = (props: Props) => {
  return (
    <input type="text"  className={"px-2.5 w-full py-1.5 rounded-lg border-2 border-indigo-700"} placeholder={props.placeholder} />
  )
}

export default Input;