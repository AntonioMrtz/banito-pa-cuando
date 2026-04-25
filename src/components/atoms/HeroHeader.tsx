import { APP_SUBTITLE, APP_TITLE } from "@/src/shared/config";

export function HeroHeader() {
  return (
    <div className="bg-transparent justify-center items-center flex flex-col gap-6">
      <h1 className="text-4xl md:text-7xl font-extrabold text-(--primary-orange-100) text-center">
        {APP_TITLE}
      </h1>
      <h2 className="text-2xl md:text-4xl text-(--primary-orange-200)/85 text-center">
        {APP_SUBTITLE}
      </h2>
    </div>
  );
}
