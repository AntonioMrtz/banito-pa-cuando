import HomeHeader from "@/src/components/atoms/HomeHeader";
import styles from "./page.module.css";
import LocationSearch from "@/src/components/organisms/LocationSearch";

export default function Home({}) {
  return (
    <main
      className={`w-screen h-screen ${styles["beach-bg"]} flex justify-center items-center flex-col gap-12`}
    >
      <HomeHeader />
      <LocationSearch />
    </main>
  );
}
