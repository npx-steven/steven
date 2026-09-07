import LocationViews from "./location-views";
import Name from "../../ui/name";

function Header() {
  return (
    <section className="content flex flex-col gap-3 md:gap-1 py-10">
      <Name name={"Steven Partida"} />
      <LocationViews />
    </section>
  );
}

export default Header;
