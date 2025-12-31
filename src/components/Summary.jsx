import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  background: #020617;
  padding: 15px;
  margin-top: 10px;
`;

export default function Summary({ heats }) {

  const totalDO = heats.reduce(
    (sum, h) => sum + h.doQty.reduce((a, b) => a + b, 0), 0
  );

  return (
    <Box>
      <div>Total Heats: {heats.length}</div>
      <div>Total DO: {totalDO}</div>
      <div>Holds: {heats.flatMap(h => h.processes).filter(p => p.status === "Hold").length}</div>
    </Box>
  );
}
