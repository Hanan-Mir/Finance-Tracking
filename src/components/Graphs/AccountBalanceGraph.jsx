import { useRef } from "react";

function AccountBalanceGraph() {
  const sectionRef = useRef();
  const pathRef = useRef();
  return (
    <section ref={sectionRef} className="py-24 w-[50%] bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex md:items-center gap-2">
          <div>
            <img src="/images/bars.png" className="md:w-20" alt="" />
          </div>
          <div>
            <h1 className="font-montserrat font-bold">Account Balance</h1>
            <p className="text-[#6D7780]">Dec 5- Dec 25,2018</p>
          </div>
        </div>

        <div className="w-full h-80 relative  rounded-lg p-4">
          <svg viewBox="0 0 600 200" className="w-full h-full">
            <defs>
              <linearGradient
                id="areaGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#10b981", stopOpacity: "0.5" }}
                />

                <stop
                  offset="100%"
                  style={{ stopColor: "#10b981", stopOpacity: "0.05s" }}
                />
              </linearGradient>
            </defs>
            <path
              d="M1.4 208.6L53.9 99.1l98.7 61.4L218 82.1l82.1 17 64.1-6.3L459.1 2l83.1 35.9 L598 35.9 L598 208.6 Z"
              fill="url(#areaGradient)"
              stroke="none"
            />
            <path
              ref={pathRef}
              d="M1.4 208.6L53.9 99.1l98.7 61.4L218 82.1l82.1 17 64.1-6.3L459.1 2l83.1 35.9 "
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <g fill="#B0B6BB">
              <text x="0" y="250" textAnchor="start">
                Dec 5
              </text>
              <text x="100" y="250" textAnchor="middle" >
                Dec 10
              </text>
              <text x="190" y="250" textAnchor="middle" >
                Dec 15
              </text>
            </g>
          </svg>
          <div className="flex md:absolute md:top-30 md:right-[-10%] shadow-box rounded-lg bg-white w-[40%] h-[35%] md:items-center gap-2">
            <div>
              <img src="/images/uparrow.png" className="md:w-10" alt="" />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-[#717A83]">
                Current Balance
              </h1>
              <p className="text-[#4ED3A9] text-[1.4rem]">+ 6489 USD</p>
            </div>
          </div>
          <div className="flex md:absolute md:top-60  md:right-[-10%] shadow-box rounded-lg bg-white w-[40%] h-[35%] md:items-center gap-2">
            <div>
              <img
                src="/images/uparrow.png"
                className="md:w-10 rotate-180"
                alt=""
              />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-[#717A83]">
                Monthly Cashflow
              </h1>
              <p className="text-[#4ED3A9] text-[1.4rem]">- 1584 USD</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountBalanceGraph;
