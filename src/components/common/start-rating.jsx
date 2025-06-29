import { StarIcon } from "lucide-react";

function StarRating({ rating, handleRatingChange }) {
  return (
    <div className="d-flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`btn btn-sm rounded-circle border-0 d-flex align-items-center justify-content-center
            ${star <= rating ? "bg-warning text-white" : "bg-light text-dark"}`}
          style={{ width: "40px", height: "40px" }}
          onClick={handleRatingChange ? () => handleRatingChange(star) : undefined}
        >
          <StarIcon
            className={`h-5 w-5 ${star <= rating ? "fill-current text-white" : "text-dark"}`}
            fill={star <= rating ? "currentColor" : "none"}
            stroke="currentColor"
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
