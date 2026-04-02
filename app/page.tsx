import styles from "./page.module.css";
import LocationSearch from "@/src/components/organisms/LocationSearch";
import LocationSuggestions from "@/src/components/atoms/LocationSuggestions";
import { HeroHeader } from "@/src/components/atoms/HeroHeader";
import { AppNameHeader } from "@/src/components/atoms/AppNameHeader";

export default function Home({}) {
  return (
    <main
      className={`w-screen h-screen ${styles["beach-bg"]} flex justify-start md:justify-center items-center flex-col gap-12 md:p-0 ${styles["p-md"]}`}
    >
      <AppNameHeader />
      <div className="w-[80%] sm:w-[40%] flex flex-col gap-6 order-2 md:order-3">
        <LocationSearch />
        {/* TODO display suggestions */}
        {[].length > 0 && <LocationSuggestions locations={[]} />}
      </div>
      <div className="order-3 md:order-2">
        <HeroHeader />
      </div>
    </main>
  );
}
