import React from "react";

type StarBorderProps < T extends React.ElementType > = {
  as ? : T;
  className ? : string;
  children ? : React.ReactNode;
  color ? : string;
  speed ? : React.CSSProperties["animationDuration"];
  thickness ? : number;
} & Omit < React.ComponentPropsWithoutRef < T > , "as" | "color" > ;

const StarBorder = <T extends React.ElementType = "div">({
  as,
  className = "",
  color = "#00bcd4",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "div";

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      style={{
        ...(style || {}),
        "--animation-duration": speed,
      } as React.CSSProperties}
      {...rest}
    >
      {/* Animated border elements */}
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          background: `linear-gradient(45deg, transparent 30%, ${color}40 50%, transparent 70%)`,
          animation: `rotate 2s linear infinite`,
        }}
      />
      
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{
          background: `linear-gradient(-45deg, transparent 30%, ${color}60 50%, transparent 70%)`,
          animation: `rotate-reverse 3s linear infinite`,
        }}
      />

      {/* Moving stars */}
      <div
        className="absolute w-[300%] h-[50%] opacity-60 bottom-[-10px] right-[-250%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 15%)`,
          animation: `star-movement-bottom ${speed} linear infinite`,
        }}
      />

      <div
        className="absolute w-[300%] h-[50%] opacity-60 top-[-10px] left-[-250%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 15%)`,
          animation: `star-movement-top ${speed} linear infinite`,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 m-[2px] rounded-[18px] overflow-hidden">
        {children}
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes star-movement-bottom {
          0% {
            transform: translateX(-50%) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-25%) translateY(-15px) rotate(90deg);
          }
          50% {
            transform: translateX(0%) translateY(-30px) rotate(180deg);
          }
          75% {
            transform: translateX(25%) translateY(-15px) rotate(270deg);
          }
          100% {
            transform: translateX(50%) translateY(0) rotate(360deg);
          }
        }

        @keyframes star-movement-top {
          0% {
            transform: translateX(50%) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(25%) translateY(15px) rotate(-90deg);
          }
          50% {
            transform: translateX(0%) translateY(30px) rotate(-180deg);
          }
          75% {
            transform: translateX(-25%) translateY(15px) rotate(-270deg);
          }
          100% {
            transform: translateX(-50%) translateY(0) rotate(-360deg);
          }
        }
      `}</style>
    </Component>
  );
};

export default StarBorder;