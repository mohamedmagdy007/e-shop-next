import Image from "next/image";
import React from "react";

export default function NotAuthorized() {
  return (
    <div>
      <Image
        src={"./unauthorized.svg"}
        width={200}
        height={200}
        sizes="100vw"
        className="w-full h-96 rounded object-contain"
        alt={"NotAuthorized"}
      />
    </div>
  );
}
