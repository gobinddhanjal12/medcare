"use client";
import styles from "./Pagination.module.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= Math.min(4, totalPages); i++) {
      pages.push(i);
    }

    if (totalPages > 6) {
      pages.push("...");
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    return pages.map((num, index) => (
      <button
        key={index}
        className={`${styles.pageButton} ${
          num === currentPage ? styles.active : ""
        }`}
        onClick={() => typeof num === "number" && handlePageChange(num)}
        disabled={num === "..."}
      >
        {num}
      </button>
    ));
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.navButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
        <span>Prev</span>
      </button>
      {renderPageNumbers()}
      <button
        className={styles.navButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;