/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { getProducts } from "./apiOperations";

const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
};

const Pagination = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["repoData", page, limit],
      queryFn: () => getProducts(page, limit),
      keepPreviousData: true,
    });
  const cols = [
    {
      accessorKey: "name",
    },
    {
      accessorKey: "trips",
    },
  ];

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log({ page });
  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            <Table columns={cols} data={data.data ?? []} />
          </div>
        )}
        <span>
          Current Page: {page + 1} of {data?.totalPages}
        </span>
        <button onClick={() => setPage(0)} disabled={page === 0}>
          First Page
        </button>
        <button
          onClick={() => {
            setPage((old) => Math.max(old - 1, 0));
            console.log({ isPreviousData });
          }}
          disabled={page === 0}
        >
          Previous Page
        </button>{" "}
        <button
          onClick={() => {
            // if (!isPreviousData && data.hasMore) {
            //   setPage((old) => old + 1);
            // }
            console.log({ isPreviousData });
            console.log(data);
            setPage((old) => old + 1);
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || data?.totalPages === page + 1}
        >
          Next Page
        </button>
        <button
          onClick={() => {
            console.log(data.totalPages);
            setPage(data.totalPages - 1);
            console.log({ page });
          }}
          disabled={data?.totalPages === page + 1}
        >
          last page
        </button>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setLimit(e.target.value);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        {isFetching ? <span> Loading...</span> : null}{" "}
      </div>
    </div>
  );
};

export default Pagination;
