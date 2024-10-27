import React from 'react';
import styled from 'styled-components';

interface HistoryEntry {
    realRate: number;
    fixedRate: number | '-';
    initialValue: string;
    initialCurrency: string;
    convertedValue: string;
    convertedCurrency: string;
}

interface HistoryProps {
    history: HistoryEntry[];
}
const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 16px;
  background: #3c3a8e;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;

  @media (max-width: 600px) {
    padding: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #4b49ac;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  background: #5b58c1;
  color: #ffffff;
  font-weight: 600;
  border-bottom: 2px solid #3c3a8e;

  @media (max-width: 600px) {
    padding: 8px 10px;
  }
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #3c3a8e;
  color: #ffffff;
  text-align: center;
  font-size: 0.9rem;

  &:first-child {
    text-align: left;
  }

  @media (max-width: 600px) {
    padding: 8px 10px;
  }
`;

const TableRow = styled.tr`
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const EmptyMessage = styled.div`
  padding: 16px;
  color: #b3b3cc;
  text-align: center;

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 0.85rem;
  }
`;


const History: React.FC<HistoryProps> = ({ history }) => {
    return (
        <TableContainer>
            {history.length === 0 ? (
                <EmptyMessage>Aucune donnée disponible pour l'historique de conversions.</EmptyMessage>
            ) : (
                <Table>
                    <thead>
                        <tr>
                        <Th>Montant Initial</Th>
              <Th>Taux Réél</Th>
              <Th>Taux Fixé</Th>
              <Th>Montant Converti</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((entry, index) => (
                            <TableRow key={index}>
                                <Td>
                                    {Number(entry.initialValue).toFixed(2)} {entry.initialCurrency}
                                </Td>
                                <Td>{entry.realRate.toFixed(4)}</Td>
                                <Td>{entry.fixedRate !== '-' ? entry.fixedRate.toFixed(4) : '-'}</Td>
                                
                                <Td>
                                    {Number(entry.convertedValue).toFixed(2)} {entry.convertedCurrency}
                                </Td>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            )}
        </TableContainer>
    )
};

export default History;
