import ProcessSearch from "@/components/ProcessSearch";

/** Layout sekcji /procesy — montuje wyszukiwarkę Cmd+K na wszystkich podstronach procesów. */
export default function ProcesyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProcessSearch />
    </>
  );
}
