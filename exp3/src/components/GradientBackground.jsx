export default function GradientBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-aurora bg-[length:200%_200%] animate-gradient-x"
        aria-hidden="true"
      />
      {/* Soft floating blobs for depth */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-300/40 blur-3xl animate-float"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
