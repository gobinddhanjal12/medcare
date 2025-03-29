"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import ReviewCard from "../components/ReviewCard/ReviewCard";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?page=${page}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setReviews(data.data);
          setTotalPages(data.pagination.pages);
        } else {
          setError("Failed to fetch reviews");
        }
      } catch (err) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [page]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className={styles.starFilled} />);
      } else if (i - 0.5 === rating) {
        stars.push(<StarHalf key={i} className={styles.starHalf} />);
      } else {
        stars.push(<StarOutline key={i} className={styles.starEmpty} />);
      }
    }
    return stars;
  };

  if (loading) return <p className={styles.loading}>Loading reviews...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Reviews</h2>
      <hr className={styles.hr}/>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews available</p>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      )}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;
