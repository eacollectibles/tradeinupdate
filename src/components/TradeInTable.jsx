import React, { useState } from "react";
import { mockTrades } from "../data/mockTrades";

const TradeInTable = () => {
  const [trades, setTrades] = useState(mockTrades);

  const updateStatus = (id, newStatus) => {
    setTrades(prev =>
      prev.map(trade =>
        trade.id === id ? { ...trade, status: newStatus } : trade
      )
    );
    alert(`Trade ${newStatus.toLowerCase()} successfully.`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trade-In Submissions</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Items</th>
            <th className="px-4 py-2">Condition</th>
            <th className="px-4 py-2">Value ($)</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade.id} className="text-center border-t">
              <td className="px-4 py-2">{trade.name}</td>
              <td className="px-4 py-2">{trade.email}</td>
              <td className="px-4 py-2">{trade.items.join(", ")}</td>
              <td className="px-4 py-2">{trade.condition}</td>
              <td className="px-4 py-2">{trade.value.toFixed(2)}</td>
              <td className="px-4 py-2">{trade.status}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => updateStatus(trade.id, "Approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(trade.id, "Declined")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeInTable;