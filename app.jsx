// App entry — assembles sections + tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#003A70",
  "headlineFont": "serif",
  "density": "comfortable",
  "dark": false,
  "heroVariant": "diagram"
}/*EDITMODE-END*/;

const ACCENTS = [
  { id: '#003A70', label: 'McKinsey Blue' },
  { id: '#1F3A5F', label: 'Navy' },
  { id: '#3D5A3A', label: 'Forest' },
  { id: '#8A6A3D', label: 'Bronze' },
  { id: '#5C2C2C', label: 'Oxblood' },
  { id: '#1A1A1A', label: 'Graphite' },
];

const FONTS = {
  serif: { label: 'Editorial serif', css: '"Source Serif 4", Georgia, serif' },
  modern: { label: 'Modern sans', css: '"Inter Tight", "Helvetica Neue", sans-serif' },
  classic: { label: 'Classic Times', css: '"Times New Roman", "Iowan Old Style", serif' },
};

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    document.documentElement.style.setProperty('--accent-soft',
      tweaks.accent === '#1F3A5F' ? '#E6EAF0' :
      tweaks.accent === '#3D5A3A' ? '#E6EBE4' :
      tweaks.accent === '#8A6A3D' ? '#EFE7DA' :
      tweaks.accent === '#5C2C2C' ? '#EBDADA' : '#E6E6E6'
    );
    document.documentElement.style.setProperty('--serif', FONTS[tweaks.headlineFont]?.css || FONTS.serif.css);
    document.body.classList.toggle('dark', !!tweaks.dark);
    document.body.classList.toggle('tight', tweaks.density === 'tight');
  }, [tweaks]);

  return (
    <>
      <Nav onJump={window.jump} />
      <Hero />
      <Trust />
      <Architecture />
      <ModulesSection />
      <HubBand />
      <Cases />
      <Pricing />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ACCENTS.map(a => (
              <button
                key={a.id}
                onClick={() => setTweak('accent', a.id)}
                title={a.label}
                style={{
                  width: 32, height: 32, borderRadius: 999,
                  border: tweaks.accent === a.id ? '2px solid #111' : '1px solid #ddd',
                  background: a.id, cursor: 'pointer', padding: 0,
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>
        </TweakSection>

        <TweakSection title="Headline typeface">
          <TweakRadio
            value={tweaks.headlineFont}
            onChange={v => setTweak('headlineFont', v)}
            options={Object.entries(FONTS).map(([id, f]) => ({ value: id, label: f.label }))}
          />
        </TweakSection>

        <TweakSection title="Density">
          <TweakRadio
            value={tweaks.density}
            onChange={v => setTweak('density', v)}
            options={[
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'tight', label: 'Tight' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Theme">
          <TweakToggle
            label="Dark mode"
            value={tweaks.dark}
            onChange={v => setTweak('dark', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
