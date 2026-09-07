import React from "react";
import { IconMapPin } from "@tabler/icons-react";
import ViewCount from "./views";

function LocationViews() {
  return (
    <section className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-1 items-center text-sm text-muted dark:text-faint">
        <IconMapPin className="size-4" stroke={2} />
        <span>Los Angeles, California</span>
      </div>
      <ViewCount />
    </section>
  );
}

export default LocationViews;
