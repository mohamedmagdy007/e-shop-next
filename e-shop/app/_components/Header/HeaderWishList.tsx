import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import actGetWishlist from "@/lib/store/wishlist/actGetWishlist";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function HeaderWishList() {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector((state) => state.wishlist.itemsId);

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);
  return (
    <div className="hidden px-5 py-2 text-sm sm:flex">
      <div className="flex items-center ">
        <div className="relative">
          <Heart className="w-6" />
          {totalQuantity.length > 0 && (
            <div
              className={`w-5 h-5 rounded-full flex justify-center items-center absolute top-[-16px] right-[-5px] bg-primary`}
            >
              {totalQuantity.length}
            </div>
          )}
        </div>
        <h3>Wishlist</h3>
      </div>
    </div>
  );
}
