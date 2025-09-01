import React from "react";

type StarBorderProps < T extends React.ElementType > = {
  as ? : T;
  className ? : string;
  children ? : React.ReactNode;
  color ? : string;
  speed ? : React.CSSProperties["animationDuration"];
  thickness ? : number;
} & Omit < React.ComponentPropsWithoutRef < T > , "as" | "color" > ;

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      style={{
        ...(style || {}),
      }}
      {...rest}
    >
      {/* Bottom animation */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* Top animation */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* Inner content */}
      <div
        className="relative z-[1] bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]"
        style={{
          borderWidth: thickness,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;