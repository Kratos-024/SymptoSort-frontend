import React from "react";

export const Footer = () => {
  return (
    <section>
      <div
        className="mt-2 
         relative "
      >
        <div className="bg-  w-full" style={{ borderRadius: "0.5rem" }}>
          <div
            className="preview flex min-h-[350px] w-full 
          justify-center p-2 sm:p-10 items-center"
          >
            <div
              className=" border-white/[0.1] px-8 py-20
              bg-muted/30 w-full relative
                overflow-hidden"
            >
              <div
                className="max-w-7xl mx-auto text-sm
                 justify-between items-start
              "
              >
                <div
                  className="flex flex-col items-center 
                justify-center w-full relative"
                >
                  <div className="mr-0 md:mr-4  md:flex mb-4">
                    <a
                      className="font-normal 
                            flex space-x-2 items-center
                             text-sm mr-1  text-black px-2 py-1 
                             relative z-20"
                      href="/"
                    >
                      <img
                        alt="logo"
                        loading="lazy"
                        width="60"
                        height="60"
                        decoding="async"
                        data-nimg="1"
                        src="./images/logo.png"
                        style={{ color: "transparent" }}
                      ></img>
                      <span
                        className="font-medium text-black
                     "
                      >
                        Healthy
                      </span>
                    </a>
                  </div>
                  <ul
                    className="transition-colors flex sm:flex-row flex-col hover:text-text-neutral-800
 text-black list-none gap-4"
                  >
                    <li className="list-none">
                      <a
                        className="transition-colors hover:text-text-neutral-800 "
                        href="/products"
                      >
                        Products
                      </a>
                    </li>
                    <li className="list-none">
                      <a
                        className="transition-colors hover:text-text-neutral-800 "
                        href="/products"
                      >
                        Studio
                      </a>
                    </li>
                    <li className="list-none">
                      <a
                        className="transition-colors hover:text-text-neutral-800
                         "
                        href="/products"
                      >
                        Clients
                      </a>
                    </li>
                    <li className="list-none">
                      <a
                        className="transition-colors
                          hover:text-text-neutral-800 "
                        href="/products"
                      >
                        Pricing
                      </a>
                    </li>
                    <li className="list-none">
                      <a
                        className="transition-colors hover:text-text-neutral-800 "
                        href="/products"
                      >
                        Blog
                      </a>
                    </li>
                    <li className="list-none">
                      <a
                        className="transition-colors hover:text-text-neutral-800 "
                        href="/products"
                      >
                        Privacy
                      </a>
                    </li>
                    <li className="list-none">
                      <a
                        className="transition-colors hover:text-text-neutral-800 "
                        href="/products"
                      >
                        Terms
                      </a>
                    </li>
                  </ul>
                  <div
                    className="w-[calc(100%+var(--offset))]  h-[var(--height)] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] max-w-7xl mx-auto mt-8"
                    style={
                      {
                        "--background": "#ffffff",
                        "--color": "rgba(0, 0, 0, 0.2)",
                        "--height": "1px",
                        "--width": "5px",
                        "--fade-stop": "90%",
                        "--offset": "200px",
                        "--color-dark": "rgba(255, 255, 255, 0.2)",
                        maskComposite: "exclude",
                      } as React.CSSProperties
                    }
                  ></div>
                </div>
                <div className="flex sm:flex-row flex-col justify-between mt-8 items-center w-full">
                  <p className=" dark:text-neutral-400 mb-8 sm:mb-0">
                    © Healthy
                  </p>
                  <div className="flex gap-4">
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text--500 text-black"
                      >
                        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6  text-black"
                      >
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M8 11l0 5"></path>
                        <path d="M8 8l0 .01"></path>
                        <path d="M12 16l0 -5"></path>
                        <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6  text-black"
                      >
                        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6  text-black"
                      >
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6  text-black"
                      >
                        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        <path d="M16.5 7.5l0 .01"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
