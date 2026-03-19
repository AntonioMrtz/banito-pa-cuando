import { APP_NAME, APP_SUBTITLE, APP_TITLE } from "@/src/shared/config";

export default function HomeHeader() {
  return (
    <div className="bg-transparent justify-center items-center flex flex-col gap-6">
      <span className="mb-6">
        <h3 className="text-white/80 text-lg font-bold tracking-[0.3em] uppercase drop-shadow-sm text-center">
          {APP_NAME}
        </h3>
      </span>
      <h1 className="text-7xl font-extrabold text-(--primary-orange-100)">
        {APP_TITLE}
      </h1>
      <h2 className="text-4xl text-(--primary-orange-200)/85 text-center">
        {APP_SUBTITLE}
      </h2>
    </div>
  );
}
