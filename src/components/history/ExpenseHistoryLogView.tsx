import React, { useState } from 'react';
import { ExpenseState } from '../calculator/ExpenseInputForm';
import { 
  Calendar, 
  Search, 
  Trash2, 
  Edit3, 
  Filter, 
  Plus, 
  AlertCircle,
  DollarSign,
  Download,
  Upload,
  PauseCircle,
  PlayCircle,
  CheckSquare,
  Square
} from 'lucide-react';

export interface ExpenseHistoryEntry extends ExpenseState {
  id: string;
  createdAt: string; // ISO date string
  isPaused?: boolean;
}

interface ExpenseHistoryLogViewProps {
  historyLogs: ExpenseHistoryEntry[];
  onDeleteEntry: (id: string) => void;
  onBulkDeleteEntries: (ids: string[]) => void;
  onTogglePauseEntry: (id: string) => void;
  onEditEntry: (entry: ExpenseHistoryEntry) => void;
  onAddNewExpense: () => void;
  onExportData: (format: 'csv' | 'json') => void;
  onImportJSON: (jsonStr: string) => void;
  currencySymbol?: string;
}

export const ExpenseHistoryLogView: React.FC<ExpenseHistoryLogViewProps> = ({
  historyLogs = [],
  onDeleteEntry,
  onBulkDeleteEntries,
  onTogglePauseEntry,
  onEditEntry,
  onAddNewExpense,
  onExportData,
  onImportJSON,
  currencySymbol = '$'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredLogs = historyLogs.filter((log) => {
    const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFreq = frequencyFilter === 'all' || log.frequency === frequencyFilter;
    return matchesSearch && matchesFreq;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLogs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLogs.map(l => l.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    onBulkDeleteEntries(selectedIds);
    setSelectedIds([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportJSON(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Data Export/Import Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl bg-white border border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-[#3464f3]">
              <Calendar className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 font-display">
              Expense History & Data Management
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track, filter, pause habits, and export/import full data backups in CSV or JSON.
          </p>
        </div>

        {/* Data Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onExportData('csv')}
            className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => onExportData('json')}
            className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export JSON</span>
          </button>

          <label className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Filter & Bulk Actions Bar */}
      <div className="light-card p-4 bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search habit history by label..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-[#3464f3]"
          />
        </div>

        {/* Filters & Bulk Buttons */}
        <div className="flex items-center space-x-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 text-xs font-bold hover:bg-rose-200 transition-all flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}

          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={frequencyFilter}
              onChange={(e) => setFrequencyFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-semibold outline-none cursor-pointer"
            >
              <option value="all">All Frequencies</option>
              <option value="daily">Daily Only</option>
              <option value="weekly">Weekly Only</option>
              <option value="monthly">Monthly Only</option>
            </select>
          </div>

          <button
            onClick={onAddNewExpense}
            className="px-4 py-2 rounded-xl bg-[#3464f3] text-white text-xs font-bold hover:bg-[#2553db] transition-all flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* History Transaction Table */}
      <div className="light-card bg-white border border-slate-200/80 overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base font-display">No Habit Records Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start by adding your first recurring expense habit to track historical impact.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-10 text-center">
                    <button onClick={toggleSelectAll} className="text-slate-400 hover:text-slate-600">
                      {selectedIds.length === filteredLogs.length ? <CheckSquare className="w-4 h-4 text-[#3464f3]" /> : <Square className="w-4 h-4" />}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">Habit Label</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Frequency</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Start Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {filteredLogs.map((log) => {
                  const isSelected = selectedIds.includes(log.id);
                  return (
                    <tr key={log.id} className={`hover:bg-slate-50/80 transition-colors ${log.isPaused ? 'opacity-60 bg-slate-50/50' : ''}`}>
                      <td className="py-3.5 px-4 text-center">
                        <button onClick={() => toggleSelectOne(log.id)} className="text-slate-400 hover:text-slate-600">
                          {isSelected ? <CheckSquare className="w-4 h-4 text-[#3464f3]" /> : <Square className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 font-display">
                        {log.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {currencySymbol}{log.amount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 capitalize">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                          {log.frequency}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onTogglePauseEntry(log.id)}
                          className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                            log.isPaused
                              ? 'bg-amber-100 text-amber-700 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {log.isPaused ? <PlayCircle className="w-3 h-3" /> : <PauseCircle className="w-3 h-3" />}
                          <span>{log.isPaused ? 'Paused' : 'Active'}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        {log.startDate}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button
                          onClick={() => onEditEntry(log)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Entry"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteEntry(log.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
