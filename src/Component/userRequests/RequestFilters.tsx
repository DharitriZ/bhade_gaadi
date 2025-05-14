import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface RequestFiltersProps {
  onFilterChange: (filters: { search: string; status: string }) => void;
}

const RequestFilters: React.FC<RequestFiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, status });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilterChange({ search, status: e.target.value });
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    onFilterChange({ search: '', status: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by username or email..."
            value={search}
            onChange={handleSearchChange}
            className="py-2 pl-10 pr-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter size={18} />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {(search || status !== '') && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              <X size={16} />
              <span className="text-sm font-medium">Clear</span>
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={status}
                onChange={handleStatusChange}
                className="py-2 px-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestFilters;