// import { isWithinInterval, parseISO, subDays, subWeeks } from "date-fns";
// import React, { useMemo, useState } from "react";
// import useAllStockIn from "../../../../hooks/useAllStockIn";
// import SkeletonStockIn from "./SkeletonStockIn";

// const StockInPage = () => {
//   const { allStocksIn, loading } = useAllStockIn();
//   const [timePeriod, setTimePeriod] = useState("all");
//   const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//   const months = [
//     { value: "all", label: "All Time" },
//     { value: "day", label: "One Day" },
//     { value: "week", label: "One Week" },
//     { value: "month", label: "Current Month" },
//     { value: "2024-01", label: "January 2024" },
//     { value: "2024-02", label: "February 2024" },
//     { value: "2024-03", label: "March 2024" },
//     { value: "2024-04", label: "April 2024" },
//     { value: "2024-05", label: "May 2024" },
//     { value: "2024-06", label: "June 2024" },
//     // Add more months as needed
//   ];

//   const filterData = (data, period) => {
//     const now = new Date();
//     let startDate;

//     switch (period) {
//       case "day":
//         startDate = subDays(now, 1);
//         break;
//       case "week":
//         startDate = subWeeks(now, 1);
//         break;
//       case "month":
//         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//         break;
//       default:
//         if (period.startsWith("2024-")) {
//           const [year, month] = period.split("-");
//           startDate = new Date(year, month - 1, 1);
//           const endDate = new Date(year, month, 0);
//           return data.filter((item) =>
//             isWithinInterval(parseISO(item.createdAt), {
//               start: startDate,
//               end: endDate,
//             })
//           );
//         }
//         return data; // All time
//     }

//     return data.filter((item) =>
//       isWithinInterval(parseISO(item.createdAt), { start: startDate, end: now })
//     );
//   };

//   const filteredStocksIn = useMemo(
//     () => filterData(allStocksIn, timePeriod),
//     [allStocksIn, timePeriod]
//   );

//   const total = filteredStocksIn.reduce(
//     (sum, item) => sum + item.costingPrice * item.quantity,
//     0
//   );

//   function formatDate(getDate) {
//     let date = new Date(getDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear()).slice(-2);

//     return `${day}/${month}/${year}`;
//   }

//   return (
//     <div>
//       <div>
//         <div>
//           <select
//             value={timePeriod}
//             onChange={(e) => setTimePeriod(e.target.value)}
//           >
//             {months.map((month, index) => (
//               <option key={index} value={month.value}>
//                 {month.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <p>Total</p>
//           <span>{total.toFixed(2)}</span>
//         </div>
//       </div>
//       <div className="p-2 grid grid-cols-2">
//         {loading ? (
//           <tbody className="my-2">
//             {skeleton.map((skel, index) => (
//               <SkeletonStockIn key={index} index={index}></SkeletonStockIn>
//             ))}
//           </tbody>
//         ) : (
//           <div>
//             <table className="w-full table-auto text-center">
//               <thead>
//                 <tr className=" ">
//                   <th className="px-4 py-2 text-left">Date</th>
//                   <th className="px-4 py-2 text-left">Id</th>
//                   <th className="px-4 py-2 text-left">Name</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Quantity</th>
//                   <th className="px-4 py-2">Total</th>
//                   <th className="px-4 py-2"></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredStocksIn.map((product, index) => (
//                   <tr
//                     key={index}
//                     className={index % 2 === 0 ? "bg-gray-200" : ""}
//                   >
//                     <td className="px-4 py-2 text-left">
//                       <p>{formatDate(product?.createdAt)}</p>
//                     </td>
//                     <td className="px-4 py-2 text-left">
//                       {product?.productId}
//                     </td>
//                     <td className="px-4 py-2 text-left">
//                       {product?.productName}
//                     </td>

//                     <td className="px-4 py-2 text-blue-700 font-semibold">
//                       {product?.costingPrice}
//                     </td>
//                     <td className="px-4 py-2 text-blue-700 font-semibold">
//                       {product?.quantity}
//                     </td>
//                     <td className="px-4 py-2 font-semibold text-red-800">
//                       {product?.quantity * product?.costingPrice}
//                     </td>

//                     {/* <td
//                 className="md:px-4 py-2 cursor-pointer  hover:text-red-700"
//                 onClick={() => handelRemoveCart(product.stockId)}
//               >
//                 <RxCross1 />
//               </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default StockInPage;

// import {
//   format,
//   isWithinInterval,
//   parseISO,
//   subDays,
//   subWeeks,
// } from "date-fns";
// import React, { useMemo, useState } from "react";
// import useAllStockIn from "../../../../hooks/useAllStockIn";
// import SkeletonStockIn from "./SkeletonStockIn";

// const generateMonths = (startYear, startMonth) => {
//   const now = new Date();
//   const months = [
//     { value: "all", label: "All Time" },
//     { value: "day", label: "One Day" },
//     { value: "week", label: "One Week" },
//     { value: "month", label: "Current Month" },
//   ];

//   for (let year = startYear; year <= now.getFullYear(); year++) {
//     const endMonth = year === now.getFullYear() ? now.getMonth() + 1 : 12;
//     const start = year === startYear ? startMonth : 1;

//     for (let month = start; month <= endMonth; month++) {
//       const monthString = `${year}-${String(month).padStart(2, "0")}`;
//       const monthLabel = format(new Date(year, month - 1), "MMMM yyyy");
//       months.push({ value: monthString, label: monthLabel });
//     }
//   }

//   return months;
// };

// const StockInPage = () => {
//   const { allStocksIn, loading } = useAllStockIn();
//   const [timePeriod, setTimePeriod] = useState("all");
//   const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   const months = generateMonths(2024, 1); // Start from January 2024

//   const filterData = (data, period) => {
//     const now = new Date();
//     let startDate;

//     switch (period) {
//       case "day":
//         startDate = subDays(now, 1);
//         break;
//       case "week":
//         startDate = subWeeks(now, 1);
//         break;
//       case "month":
//         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//         break;
//       default:
//         if (period.startsWith("2024-")) {
//           const [year, month] = period.split("-");
//           startDate = new Date(year, month - 1, 1);
//           const endDate = new Date(year, month, 0);
//           return data.filter((item) =>
//             isWithinInterval(parseISO(item.createdAt), {
//               start: startDate,
//               end: endDate,
//             })
//           );
//         }
//         return data; // All time
//     }

//     return data.filter((item) =>
//       isWithinInterval(parseISO(item.createdAt), { start: startDate, end: now })
//     );
//   };

//   const filteredStocksIn = useMemo(
//     () => filterData(allStocksIn, timePeriod),
//     [allStocksIn, timePeriod]
//   );

//   const total = filteredStocksIn.reduce(
//     (sum, item) => sum + item.costingPrice * item.quantity,
//     0
//   );

//   function formatDate(getDate) {
//     let date = new Date(getDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear()).slice(-2);

//     return `${day}/${month}/${year}`;
//   }

//   return (
//     <div>
//       <div>
//         <div>
//           <select
//             value={timePeriod}
//             onChange={(e) => setTimePeriod(e.target.value)}
//           >
//             {months.map((month, index) => (
//               <option key={index} value={month.value}>
//                 {month.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <p>Total</p>
//           <span>{total.toFixed(2)}</span>
//         </div>
//       </div>
//       <div className="p-2 grid grid-cols-2">
//         {loading ? (
//           <tbody className="my-2">
//             {skeleton.map((skel, index) => (
//               <SkeletonStockIn key={index} index={index}></SkeletonStockIn>
//             ))}
//           </tbody>
//         ) : (
//           <div>
//             <table className="w-full table-auto text-center">
//               <thead>
//                 <tr className=" ">
//                   <th className="px-4 py-2 text-left">Date</th>
//                   <th className="px-4 py-2 text-left">Id</th>
//                   <th className="px-4 py-2 text-left">Name</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Quantity</th>
//                   <th className="px-4 py-2">Total</th>
//                   <th className="px-4 py-2"></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredStocksIn.map((product, index) => (
//                   <tr
//                     key={index}
//                     className={index % 2 === 0 ? "bg-gray-200" : ""}
//                   >
//                     <td className="px-4 py-2 text-left">
//                       <p>{formatDate(product?.createdAt)}</p>
//                     </td>
//                     <td className="px-4 py-2 text-left">
//                       {product?.productId}
//                     </td>
//                     <td className="px-4 py-2 text-left">
//                       {product?.productName}
//                     </td>

//                     <td className="px-4 py-2 text-blue-700 font-semibold">
//                       {product?.costingPrice}
//                     </td>
//                     <td className="px-4 py-2 text-blue-700 font-semibold">
//                       {product?.quantity}
//                     </td>
//                     <td className="px-4 py-2 font-semibold text-red-800">
//                       {product?.quantity * product?.costingPrice}
//                     </td>

//                     {/* <td
//                 className="md:px-4 py-2 cursor-pointer  hover:text-red-700"
//                 onClick={() => handelRemoveCart(product.stockId)}
//               >
//                 <RxCross1 />
//               </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default StockInPage;

// import { format, startOfMonth, subDays, subMonths, subWeeks } from "date-fns";
// import React, { useEffect, useState } from "react";
// import SkeletonStockIn from "./SkeletonStockIn";

// const StockInPage = () => {
//   const [allStocksIn, setAllStocksIn] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [limit] = useState(10);
//   const [timePeriod, setTimePeriod] = useState("all"); // "all", "day", "week", "15days", "month", "lastMonth"

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         let url = `http://localhost:5000/api/v1/stocks/stocks-in?page=${page}&limit=${limit}`;
//         if (timePeriod !== "all") {
//           const now = new Date();
//           let startDate;
//           if (timePeriod === "day") {
//             startDate = subDays(now, 1);
//           } else if (timePeriod === "week") {
//             startDate = subWeeks(now, 1);
//           } else if (timePeriod === "15days") {
//             startDate = subDays(now, 15);
//           } else if (timePeriod === "month") {
//             startDate = startOfMonth(now);
//           } else if (timePeriod === "lastMonth") {
//             startDate = startOfMonth(subMonths(now, 1));
//             const endDate = startOfMonth(now);
//             url += `&endDate=${format(endDate, "yyyy-MM-dd")}`;
//           }
//           const formattedStartDate = format(startDate, "yyyy-MM-dd");
//           url += `&startDate=${formattedStartDate}`;
//         }
//         const response = await fetch(url);
//         const data = await response.json();
//         setAllStocksIn(data.data);
//         setTotalPages(data.totalPages);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [page, limit, timePeriod]);

//   const skleton = Array.from({ length: limit }, (_, index) => index + 1);

//   function formatDate(getDate) {
//     let date = new Date(getDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear()).slice(-2);

//     return `${day}/${month}/${year}`;
//   }

//   const total = allStocksIn.reduce(
//     (sum, item) => sum + item.costingPrice * item.quantity,
//     0
//   );

//   const handleTimePeriodChange = (event) => {
//     setTimePeriod(event.target.value);
//   };

//   return (
//     <div>
//       <div>
//         <div>
//           <select value={timePeriod} onChange={handleTimePeriodChange}>
//             <option value="all">All Time</option>
//             <option value="day">One Day</option>
//             <option value="week">One Week</option>
//             <option value="15days">15 Days</option>
//             <option value="month">One Month</option>
//             <option value="lastMonth">Last Month</option>
//           </select>
//         </div>
//         <div>
//           <p>Total</p>
//           <span>{total.toFixed(2)}</span>
//         </div>
//       </div>
//       <div className="p-2 grid grid-cols-2">
//         {loading ? (
//           <tbody className="my-2">
//             {skleton.map((skel, index) => (
//               <SkeletonStockIn key={index} index={index}></SkeletonStockIn>
//             ))}
//           </tbody>
//         ) : (
//           <div>
//             <table className="w-full table-auto text-center">
//               <thead>
//                 <tr className=" ">
//                   <th className="px-4 py-2 text-left">Date</th>
//                   <th className="px-4 py-2 text-left">Id</th>
//                   <th className="px-4 py-2 text-left">Name</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Quantity</th>
//                   <th className="px-4 py-2">Total</th>
//                   <th className="px-4 py-2"></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {allStocksIn.map((product, index) => (
//                   <tr
//                     key={index}
//                     className={index % 2 === 0 ? "bg-gray-200" : ""}
//                   >
//                     <td className="px-4 py-2 text-left">
//                       <p>{formatDate(product?.createdAt)}</p>
//                     </td>
//                     <td className="px-4 py-2 text-left">
//                       {product?.productId}
//                     </td>
//                     <td className="px-4 py-2 text-left">
//                       {product?.productName}
//                     </td>

//                     <td className="px-4 py-2 text-blue-700 font-semibold">
//                       {product?.costingPrice}
//                     </td>
//                     <td className="px-4 py-2 text-blue-700 font-semibold">
//                       {product?.quantity}
//                     </td>
//                     <td className="px-4 py-2 font-semibold text-red-800">
//                       {product?.quantity * product?.costingPrice}
//                     </td>

//                     {/* <td
//                 className="md:px-4 py-2 cursor-pointer  hover:text-red-700"
//                 onClick={() => handelRemoveCart(product.stockId)}
//               >
//                 <RxCross1 />
//               </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1}
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={page === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockInPage;

import {
  format,
  isWithinInterval,
  parseISO,
  startOfMonth,
  subDays,
  subWeeks,
} from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import useAllStockIn from "../../../../hooks/useAllStockIn";
import SkeletonStockIn from "./SkeletonStockIn";

const generateMonths = (startYear, startMonth) => {
  const now = new Date();
  const months = [
    { value: "all", label: "All Time" },
    { value: "day", label: "One Day" },
    { value: "week", label: "One Week" },
    { value: "month", label: "Current Month" },
  ];

  for (let year = startYear; year <= now.getFullYear(); year++) {
    const endMonth = year === now.getFullYear() ? now.getMonth() + 1 : 12;
    const start = year === startYear ? startMonth : 1;

    for (let month = start; month <= endMonth; month++) {
      const monthString = `${year}-${String(month).padStart(2, "0")}`;
      const monthLabel = format(new Date(year, month - 1), "MMMM yyyy");
      months.push({ value: monthString, label: monthLabel });
    }
  }

  return months;
};

const StockInPage = () => {
  const { allStocksIn, loading } = useAllStockIn();
  const [timePeriod, setTimePeriod] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [skeleton, setSkeleton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const months = useMemo(() => generateMonths(2024, 1), []);

  useEffect(() => {
    if (allStocksIn.length > 0) {
      setTotalPages(Math.ceil(allStocksIn.length / 10));
    }
  }, [allStocksIn]);

  const filterData = (data, period) => {
    const now = new Date();
    let startDate;

    switch (period) {
      case "day":
        startDate = subDays(now, 1);
        break;
      case "week":
        startDate = subWeeks(now, 1);
        break;
      case "month":
        startDate = startOfMonth(now);
        break;
      default:
        if (period.startsWith("20")) {
          const [year, month] = period.split("-");
          startDate = new Date(year, month - 1, 1);
          const endDate = new Date(year, month, 0);
          return data.filter((item) =>
            isWithinInterval(parseISO(item.createdAt), {
              start: startDate,
              end: endDate,
            })
          );
        }
        return data; // All time
    }

    return data.filter((item) =>
      isWithinInterval(parseISO(item.createdAt), { start: startDate, end: now })
    );
  };

  const filteredStocksIn = useMemo(
    () => filterData(allStocksIn, timePeriod),
    [allStocksIn, timePeriod]
  );

  const total = filteredStocksIn.reduce(
    (sum, item) => sum + item.costingPrice * item.quantity,
    0
  );

  function formatDate(getDate) {
    let date = new Date(getDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * 10;
    const endIndex = pageNumber * 10;
    setSkeleton(
      Array.from({ length: 10 }, (_, index) => startIndex + index + 1)
    );
  };

  return (
    <div>
      <div>
        <div>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {months.map((month, index) => (
              <option key={index} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Total</p>
          <span>{total.toFixed(2)}</span>
        </div>
      </div>
      <div className="p-2 grid grid-cols-2">
        {loading ? (
          <tbody className="my-2">
            {skeleton.map((skel, index) => (
              <SkeletonStockIn key={index} index={index}></SkeletonStockIn>
            ))}
          </tbody>
        ) : (
          <div>
            <table className="w-full table-auto text-center">
              <thead>
                <tr className=" ">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Id</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody>
                {filteredStocksIn
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((product, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-200" : ""}
                    >
                      <td className="px-4 py-2 text-left">
                        <p>{formatDate(product?.createdAt)}</p>
                      </td>
                      <td className="px-4 py-2 text-left">
                        {product?.productId}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {product?.productName}
                      </td>

                      <td className="px-4 py-2 text-blue-700 font-semibold">
                        {product?.costingPrice}
                      </td>
                      <td className="px-4 py-2 text-blue-700 font-semibold">
                        {product?.quantity}
                      </td>
                      <td className="px-4 py-2 font-semibold text-red-800">
                        {product?.quantity * product?.costingPrice}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockInPage;
