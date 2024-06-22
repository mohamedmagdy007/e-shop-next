"use client";
import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleX } from "lucide-react";

export default function Modal({
  title,
  children,
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  title: string;
  closeModal: () => void;
  children: ReactNode;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={closeModal}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row justify-between items-center">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <CircleX className="cursor-pointer" onClick={closeModal} />
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
