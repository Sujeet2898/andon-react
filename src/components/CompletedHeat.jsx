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
  vertical-align: middle;
`;

const StatusCell = styled.td`
  padding: 6px;
  border: 1px solid #334155;
  text-align: center;
  vertical-align: middle;
`;

const StatusContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
`;

const StatusCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 auto;
  background: ${({ status }) => statusColor(status)};
`;

const ProcessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
`;

// styled row with dynamic background
const HeatRow = styled.tr`
  background: ${({ bg }) => bg};
`;

export default function HeatDashboard2({ heats }) {
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

            {/* Second Column: DO + ToT */}
            <StatusCell>
              <StatusContent>
                <div>
                  <strong>DO (MT):</strong> {heat.doQty?.join(", ") || "-"}
                </div>
                <div>
                  <strong>ToT (Hrs):</strong> {heat.heatTime || "00:00"}
                </div>
              </StatusContent>
            </StatusCell>

            {/* Process Columns */}
            {heat.processes.map((p, pIndex) => (
              <Td key={pIndex}>
                <ProcessContent>
                  <StatusCircle status={p.status} />
                  <div>{p.duration || "00:00"}</div>
                  <div>{p.reason || "-"}</div>
                </ProcessContent>
              </Td>
            ))}
          </HeatRow>
        ))}
      </tbody>
    </Table>
  );
}
