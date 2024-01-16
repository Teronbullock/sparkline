
interface IBtnProps {
  text: string;
  link: string;
  btnclass: string;
  ariaLabel?: string;
}

export default function Btn({text, link, btnclass, ariaLabel} : IBtnProps) {
  return (
    <a href={link} className={`btn rounded ${btnclass}`}aria-label={ariaLabel}>{text}</a>
  )
}