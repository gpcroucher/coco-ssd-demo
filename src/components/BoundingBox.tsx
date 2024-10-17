export default function BoundingBox({
  bbox,
  guess,
}: {
  bbox: number[];
  guess: string;
}) {
  const [x, y, width, height] = bbox;

  return (
    <div
      className="border border-cyan-400 absolute w-24 h-24"
      style={{
        left: x + "px",
        top: y + "px",
        width: width + "px",
        height: height + "px",
      }}
    >
      <div className="absolute bg-cyan-400" style={{ bottom: height + "px" }}>
        <p>{guess}</p>
      </div>
    </div>
  );
}
