import { useState } from "react";

export const StarRating = ({ initialRating, setStarRating }) => {
  const [rating, setRating] = useState(initialRating);

  return (
    <div className="flex justify-center items-center">
      {[...Array(5)].map((e, i) => (
        <div className="flex items-center mt-2 mb-4">
          <svg
            onClick={() => {
              setRating(i + 1);
              setStarRating(i + 1);
            }}
            className={`cursor-pointer mx-1 w-4 h-4 fill-current ${
              i + 1 <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
