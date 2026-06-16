import SlownikSearch from "@/components/SlownikSearch";

/** Layout sekcji /slownik — montuje wyszukiwarkę Cmd+K na wszystkich podstronach słownika. */
export default function SlownikLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SlownikSearch />
    </>
  );
}
