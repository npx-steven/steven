import LocationViews from "./location-views";
import Name from "./name";

function PageHeader() {
  return (
    <section className="content flex flex-col gap-1 py-10">
      <Name name={"Steven Partida"} />
      <LocationViews />
    </section>
  );
}

export default PageHeader;
