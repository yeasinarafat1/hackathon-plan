import Image from "next/image";
import React from "react";

const layout = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Image
        src={"/auth_left_side_img.jpeg"}
        width={1000}
        height={1000}
        alt={""}
        className="hidden lg:block  w-1/2 object-cover h-screen"
      />
      {children}
    </main>
  );
};

export default layout;
