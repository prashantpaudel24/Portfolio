export default function MenuIcon({ onClick }) {
  return (
    <button onClick={onClick}>
      <img src="/img/menu.png" className="w-10 cursor-pointer hover:scale-110 transition" />
    </button>
  );
}

