"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";


export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination: PaginationConfig;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onSearch?: (search: string) => void;
  onSort?: (key: string, order: "asc" | "desc") => void;
  emptyMessage?: string;
  className?: string;
  getRowId?: (item: T) => string | number;
  striped?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  pagination,
  loading = false,
  searchable = true,
  searchPlaceholder = "Search...",
  onPageChange,
  onLimitChange,
  onSearch,
  onSort,
  emptyMessage = "No data available",
  className = "",
  getRowId = (item: T) => (item as any).id,
  striped = true,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    order: "asc" | "desc";
  } | null>(null);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleSort = (key: string) => {
    const newOrder =
      sortConfig?.key === key && sortConfig.order === "asc" ? "desc" : "asc";
    setSortConfig({ key, order: newOrder });
    onSort?.(key, newOrder);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      onPageChange?.(page);
    }
  };

  const handleLimitChange = (limit: number) => {
    onLimitChange?.(limit);
  };

  const renderPaginationButtons = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded text-xs bg-primary text-white hover:bg-primary-700 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded text-xs transition-colors ${
            currentPage === i
              ? "bg-primary text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={`space-y-4 ${className}`}>
    

      {/* Table */}
      <div className="bg-white rounded-md shadow-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 text-left text-xs font-medium text-sawa-blue-dark uppercase ${
                      column.sortable ? "cursor-pointer hover:bg-gray-200" : ""
                    } ${column.className || ""}`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && (
                        <span className="text-xs">
                          {sortConfig?.key === column.key
                            ? sortConfig.order === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b">
                    <td colSpan={columns.length} className="px-6 py-4">
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={getRowId(item)}
                    className={`${
                      striped
                        ? index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                        : "bg-white"
                    } border-b hover:bg-gray-100 transition-colors duration-150`}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${getRowId(item)}-${column.key}`}
                        className={`px-6 py-3 text-sawa-blue-dark text-sm ${
                          column.className || ""
                        }`}
                      >
                        {column.render
                          ? column.render(item)
                          : (item as any)[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && data && data.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-primary-600 font-medium">
                SHOWING{" "}
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} TO{" "}
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{" "}
                OF {pagination.totalItems}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <select
                  value={pagination.itemsPerPage}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              
              </button>

              <div className="flex gap-2">{renderPaginationButtons()}</div>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs"
              >
              
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
