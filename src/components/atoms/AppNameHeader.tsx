import { APP_NAME } from "@/src/shared/config";

export function AppNameHeader() {
  return (
    <span className="md:mb-6 order-1">
      <h3 className="text-white/80 md:text-lg font-bold tracking-[0.3em] uppercase drop-shadow-sm text-center">
        {APP_NAME}
      </h3>
    </span>
  );
}
