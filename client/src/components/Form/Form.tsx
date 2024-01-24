import './form.scss';



export default function Form() {
  return (
    <div className="sl-form__container border-2 rounded-lg p-8 border-black">
      <form className="sl-form ">
        <input type="text" placeholder="Name" />
        <select >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <textarea placeholder="Message" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}