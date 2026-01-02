import { useState } from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 8px;
  background: #020617;
  font-size: 14px;
  color: white;
`;

const Td = styled.td`
  padding: 6px;
  border: 1px solid #1e293b;
  text-align: center;
  color: white;
`;

const StatusSelect = styled.select`
  padding: 5px;
  color: white;
  background: ${({ value }) =>
    value === "Completed"
      ? "green"
      : value === "In Progress"
      ? "orange"
      : value === "Hold"
      ? "red"
      : "gray"};
`;

const Button = styled.button`
  padding: 6px 12px;
  background: #22c55e;
  border: none;
  cursor: pointer;
  color: white;
`;

const SmallInput = styled.input`
  width: 80px;
  padding: 4px;
  font-size: 12px;
  margin: 2px;
`;

const ReasonInput = styled.input`
  width: 80%;
  padding: 4px;
  font-size: 11px;
  margin-top: 4px;
  background: #020617;
  color: white;
  border: 1px solid #334155;
`;

const processes = [
  "Chamfering",
  "Straightening",
  "Auto UT",
  "MPI",
  "Grinding",
  "Visual",
  "Quality Audit",
  "UT",
  "Spark",
  "XRF",
  "Packaging",
];

// Format duration into hh:mm
const formatHHMM = (diffMs) => {
  if (diffMs <= 0) return "00:00";
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}`;
};

// Calculate duration for one process
const calcDuration = (startDate, start, endDate, end) => {
  if (!startDate || !start || !endDate || !end) return "00:00";
  const startDT = new Date(`${startDate}T${start}`);
  const endDT = new Date(`${endDate}T${end}`);
  return formatHHMM(endDT - startDT);
};

// Calculate total heat time across processes
const calcHeatTotal = (processes) => {
  const starts = processes
    .filter((p) => p.startDate && p.start)
    .map((p) => new Date(`${p.startDate}T${p.start}`).getTime());
  const ends = processes
    .filter((p) => p.endDate && p.end)
    .map((p) => new Date(`${p.endDate}T${p.end}`).getTime());

  if (starts.length === 0 || ends.length === 0) return "00:00";

  const minStart = Math.min(...starts);
  const maxEnd = Math.max(...ends);
  return formatHHMM(maxEnd - minStart);
};

export default function AndonTable({ heats, setHeats }) {
  const addHeat = () => {
    setHeats([
      ...heats,
      {
        heatNo: "",
        grade: "",
        size: "",
        contractor: "",
        processes: processes.map((name) => ({
          processName: name,
          status: "NA",
          startDate: "",
          start: "",
          endDate: "",
          end: "",
          duration: "00:00",
          reason: "",
        })),
        doQty: [0],
        heatTime: "00:00",
      },
    ]);
  };

  return (
    <>
      <Button onClick={addHeat}>➕ Add Heat</Button>
      <Table>
        <thead>
          <tr>
            <Th>Heat Detail</Th>
            {processes.map((p) => (
              <Th key={p}>{p}</Th>
            ))}
            <Th>DO</Th>
            <Th>Total Time</Th>
          </tr>
        </thead>

        <tbody>
          {heats.map((heat, hIndex) => {
            const totalHHMM = calcHeatTotal(heat.processes);
            heat.heatTime = totalHHMM;

            return (
              <tr key={hIndex}>
                {/* Heat Detail Column */}
                <Td>
                  <div>
                    <label>Heat No:</label>
                    <SmallInput
                      value={heat.heatNo}
                      onChange={(e) => {
                        heat.heatNo = e.target.value;
                        setHeats([...heats]);
                      }}
                    />
                  </div>
                  <div>
                    <label>Grade:</label>
                    <SmallInput
                      value={heat.grade}
                      onChange={(e) => {
                        heat.grade = e.target.value;
                        setHeats([...heats]);
                      }}
                    />
                  </div>
                  <div>
                    <label>Size:</label>
                    <SmallInput
                      value={heat.size}
                      onChange={(e) => {
                        heat.size = e.target.value;
                        setHeats([...heats]);
                      }}
                    />
                  </div>
                  <div>
                    <label>Contractor:</label>
                    <SmallInput
                      value={heat.contractor}
                      onChange={(e) => {
                        heat.contractor = e.target.value;
                        setHeats([...heats]);
                      }}
                    />
                  </div>
                </Td>

                {/* Process Columns */}
                {heat.processes.map((p, pIndex) => {
                  const durationHHMM = calcDuration(
                    p.startDate,
                    p.start,
                    p.endDate,
                    p.end
                  );
                  p.duration = durationHHMM;

                  return (
                    <Td key={pIndex}>
                      <StatusSelect
                        value={p.status}
                        onChange={(e) => {
                          p.status = e.target.value;
                          setHeats([...heats]);
                        }}
                      >
                        <option>Completed</option>
                        <option>In Progress</option>
                        <option>Hold</option>
                        <option>NA</option>
                      </StatusSelect>
                      <br />

                      {/* Start Date + Time */}
                      <input
                        type="date"
                        value={p.startDate}
                        onChange={(e) => {
                          p.startDate = e.target.value;
                          setHeats([...heats]);
                        }}
                      />
                      <input
                        type="time"
                        value={p.start}
                        onChange={(e) => {
                          p.start = e.target.value;
                          setHeats([...heats]);
                        }}
                      />

                      {/* End Date + Time */}
                      <input
                        type="date"
                        value={p.endDate}
                        onChange={(e) => {
                          p.endDate = e.target.value;
                          setHeats([...heats]);
                        }}
                      />
                      <input
                        type="time"
                        value={p.end}
                        onChange={(e) => {
                          p.end = e.target.value;
                          setHeats([...heats]);
                        }}
                      />

                      <div>{durationHHMM}</div>

                      <ReasonInput
                        type="text"
                        placeholder="Reason"
                        value={p.reason}
                        onChange={(e) => {
                          p.reason = e.target.value;
                          setHeats([...heats]);
                        }}
                      />
                    </Td>
                  );
                })}

                {/* DO Column */}
                <Td>
                  <Button
                    onClick={() => {
                      heat.doQty.push(0);
                      setHeats([...heats]);
                    }}
                  >
                    +DO
                  </Button>

                  {heat.doQty.map((q, i) => (
                    <SmallInput
                      key={i}
                      type="number"
                      value={q}
                      onChange={(e) => {
                        heat.doQty[i] = Number(e.target.value);
                        setHeats([...heats]);
                      }}
                    />
                  ))}
                </Td>

                {/* Total Time Column */}
                <Td>{totalHHMM} hh:mm</Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
