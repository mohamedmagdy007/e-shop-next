"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/lib/store/hooks";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

function Dropdown({ id }: { id: number }) {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      {user?.role === "admin" ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-1 top-1">
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/products/edit/${id}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
}

export default Dropdown;
