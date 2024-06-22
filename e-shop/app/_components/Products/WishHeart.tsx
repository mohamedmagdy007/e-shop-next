"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import Modal from "../Modal";
import actLikeToggle from "@/lib/store/wishlist/actLikeToggle";

export default function WishHeart({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const dispatch = useAppDispatch();
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const likeToggleHandler = () => {
    if (user) {
      if (!isLoading) {
        setIsLoading(true);
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    } else {
      setShowModal(true);
    }
  };
  return (
    <>
      <Modal
        title="Login Required"
        closeModal={handleToggleModal}
        isOpen={showModal}
      >
        <p>You need to login first to add this item to your wishList.</p>
      </Modal>
      <div
        className="absolute top-2 left-2 cursor-pointer"
        onClick={likeToggleHandler}
      >
        {wishListItemsId.includes(id) ? (
          <Heart width={45} fill="#ff0000" strokeWidth={0} />
        ) : (
          <Heart width={45} />
        )}
      </div>
    </>
  );
}
