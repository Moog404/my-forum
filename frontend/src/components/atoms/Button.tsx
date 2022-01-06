interface Props {
  content: string,
  modifier: string,
}

const Button = (props: Props) => {

  const modifiers: { [key: string]: string } = {
    primary: 'shadow-indigo-600/50 bg-indigo-600 text-white',
    secondary: 'shadow-slate-600/50 bg-white text-indigo',
    danger: 'shadow-pink-600/50 bg-pink-600 text-white'
  }

  const getModifierClasses = () => modifiers[props.modifier];

  return (
    <button
      className={`font-bold px-3 min-w-[80px] rounded-lg shadow-md py-1.5 text-sm ${ getModifierClasses() }`}
    >
      { props.content }
    </button>
  )
}

export default Button;