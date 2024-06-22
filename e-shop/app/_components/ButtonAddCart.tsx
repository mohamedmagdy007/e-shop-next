"use client";

import { addToCart } from "@/lib/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState, memo } from "react";
import Modal from "./Modal";

export default memo(function ButtonAddCart({
  id,
  max,
}: {
  id: number;
  max: number;
}) {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user } = useAppSelector((state) => state.auth);
  const currentRemainingQuantity = max - (cartItems[id] ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };
  const addToCartHandler = () => {
    if (user) {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    } else {
      setOpenModal(true);
    }
  };
  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  return (
    <>
      <Modal
        title="Login Required"
        closeModal={handleToggleModal}
        isOpen={openModal}
      >
        <p>You need to login first to add this item to your cart.</p>
      </Modal>
      <div className="grid">
        <button
          className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          add to cart
        </button>
        <p className="text-sm">
          {quantityReachedToMax
            ? "You reach to the limit"
            : `You can add ${currentRemainingQuantity} item(s)`}
        </p>
      </div>
    </>
  );
});
