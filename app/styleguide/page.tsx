const WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function Swatch({
  cls,
  name,
  hex,
}: {
  cls: string;
  name: string;
  hex?: string;
}) {
  return (
    <div className="text-xs">
      <div className={`h-20 w-20 border border-border ${cls}`} />
      <div className="mt-1">{name}</div>
      {hex && <div className="text-fg-faint">{hex}</div>}
    </div>
  );
}

export default function Styleguide() {
  return (
    <div className="bg-background text-foreground min-h-screen p-10 space-y-10">
      <section>
        <h2 className="font-display text-2xl mb-3">
          Inter Tight — font-display
        </h2>
        {WEIGHTS.map((w) => (
          <p key={w} className="font-display text-xl" style={{ fontWeight: w }}>
            {w} — Steven Partida, portfolio
          </p>
        ))}
      </section>

      <section>
        <h2 className="font-display text-2xl mb-3">Inter — font-sans</h2>
        {WEIGHTS.map((w) => (
          <p key={w} className="font-sans text-xl" style={{ fontWeight: w }}>
            {w} — Steven Partida, portfolio
          </p>
        ))}
      </section>

      <section>
        <h2 className="font-display text-2xl mb-3">
          Inherited default (no font class)
        </h2>
        <p className="text-xl">Should render as Inter, not system sans.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-3">Raw ramp</h2>
        <p className="text-fg-muted text-sm mb-3">
          Theme-independent. These must NOT change in dark mode.
        </p>
        <div className="flex flex-wrap gap-3">
          <Swatch cls="bg-black" name="black" hex="#000000" />
          <Swatch cls="bg-ink" name="ink" hex="#191918" />
          <Swatch cls="bg-muted" name="muted" hex="#6F6F6B" />
          <Swatch cls="bg-faint" name="faint" hex="#9B9A96" />
          <Swatch cls="bg-rule" name="rule" hex="#E3E2E0" />
          <Swatch cls="bg-wash" name="wash" hex="#F7F7F5" />
          <Swatch cls="bg-page" name="page" hex="#FFFFFF" />
          <Swatch cls="bg-error" name="error" hex="#B3261E" />
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-3">Semantic</h2>
        <p className="text-fg-muted text-sm mb-3">
          Role-based. These MUST invert in dark mode.
        </p>
        <div className="flex flex-wrap gap-3">
          <Swatch cls="bg-background" name="background" />
          <Swatch cls="bg-foreground" name="foreground" />
          <Swatch cls="bg-bg-subtle" name="bg-subtle" />
          <Swatch cls="bg-fg-muted" name="fg-muted" />
          <Swatch cls="bg-fg-faint" name="fg-faint" />
          <Swatch cls="bg-border" name="border" />
          <Swatch cls="bg-danger" name="danger" />
        </div>
        <p className="text-fg-muted mt-4">fg-muted — secondary copy</p>
        <p className="text-fg-faint">fg-faint — tertiary copy</p>
        <p className="text-danger">danger — error state</p>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-3">Surfaces</h2>
        <div className="bg-bg-subtle border border-border rounded-lg p-6 max-w-md">
          <h3 className="font-display text-lg">Card on bg-subtle</h3>
          <p className="text-fg-muted mt-1">
            Border, subtle surface, and muted copy composed together — the
            combination you will actually ship.
          </p>
        </div>
      </section>
    </div>
  );
}
