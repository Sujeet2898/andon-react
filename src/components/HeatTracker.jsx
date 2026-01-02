import styled from "styled-components";

const statusColor = (status) => {
  switch (status) {
    case "Completed":
      return "#22c55e";
    case "In Progress":
      return "#f59e0b";
    case "Hold":
      return "#ef4444";
    default:
      return "#94a3b8";
  }
};

// palette of attractive row colors
const heatColors = [
  "linear-gradient(135deg, #1e3a8a, #3b82f6)", // blue
  "linear-gradient(135deg, #0f766e, #14b8a6)", // teal
  "linear-gradient(135deg, #7c3aed, #a78bfa)", // violet
  "linear-gradient(135deg, #be185d, #f43f5e)", // pink/red
  "linear-gradient(135deg, #2563eb, #60a5fa)", // bright blue
  "linear-gradient(135deg, #059669, #34d399)", // emerald
];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #020617;
  color: white;
`;

const Th = styled.th`
  padding: 8px;
  background: #1e293b;
  font-size: 13px;
  color: white;
`;

const Td = styled.td`
  padding: 6px;
  border: 1px solid #334155;
  text-align: center;
  vertical-align: top;
`;

const StatusCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 0 auto 4px;
  background: ${({ status }) => statusColor(status)};
`;

// styled row with dynamic background
const HeatRow = styled.tr`
  background: ${({ bg }) => bg};
`;

export default function HeatDashboard({ heats }) {
  if (!heats || heats.length === 0) {
    return (
      <div style={{ color: "white", padding: "16px" }}>
        No Heat Data Available
      </div>
    );
  }

  const processNames = heats[0]?.processes?.map((p) => p.processName) || [];

  return (
    <Table>
      <thead>
        <tr>
          <Th>Heat Info</Th>
          <Th>Status</Th>
          {processNames.map((name, i) => (
            <Th key={i}>{name}</Th>
          ))}
        </tr>
      </thead>

      <tbody>
        {heats.map((heat, hIndex) => (
          <HeatRow key={hIndex} bg={heatColors[hIndex % heatColors.length]}>
            {/* First Column: Heat Info */}
            <Td>
              <div>
                <strong>Heat No:</strong> {heat.heatNo || "-"}
              </div>
              <div>
                <strong>Grade:</strong> {heat.grade || "-"}
              </div>
              <div>
                <strong>Size:</strong> {heat.size || "-"}
              </div>
              <div>
                <strong>Contractor:</strong> {heat.contractor || "-"}
              </div>
            </Td>

            {/* Second Column: Fixed Headings + DO + Total Time */}
            <Td>
              <div>
                <strong>DO:</strong> {heat.doQty?.join(", ") || "-"}
              </div>
              <div>
                <strong>ToT:</strong> {heat.heatTime || "00:00"}
              </div>
            </Td>

            {/* Process Columns */}
            {heat.processes.map((p, pIndex) => (
              <Td key={pIndex}>
                <StatusCircle status={p.status} />
                <div>{p.duration || "00:00"}</div>
                <div>{p.reason || "-"}</div>
              </Td>
            ))}
          </HeatRow>
        ))}
      </tbody>
    </Table>
  );
}
