
interface IBtnProps {
  text: string;
  link: string;
  btnclass: string;
}

export default function Btn({text, link, btnclass} : IBtnProps) {
  return (
    <a href={link} className={`btn rounded ${btnclass}`}>{text}</a>
  )
}