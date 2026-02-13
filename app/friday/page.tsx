"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "@/components/flowers.scss";
import Construction from "@/components/construction";
import { useSwitchPage } from "@/components/switchPageContext";

const getNextFridayMidnight = (now: Date) => {
  const target = new Date(now);
  const friday = 5;
  const day = now.getDay();
  const daysUntilFriday = (friday - day + 7) % 7;

  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(0, 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }

  return target;
};

export default function Friday() {
  const [remainingMs, setRemainingMs] = useState(0);
  const { switchPage, setSwitchPage } = useSwitchPage();

  useEffect(() => {
    // const nextTarget = getNextFridayMidnight(new Date());
    const nextTarget = new Date("2026-02-12T20:44:00");
    setRemainingMs(Math.max(0, nextTarget.getTime() - Date.now()));

    const timer = window.setInterval(() => {
      if (nextTarget.getTime() <= Date.now()) {
        setSwitchPage(true);
      }

      setRemainingMs(Math.max(0, nextTarget.getTime() - Date.now()));
    }, 250);

    return () => window.clearInterval(timer);
  }, []);

  return switchPage ? <Flowers /> : <Construction remainingMs={remainingMs} />;
}

/*

  CSS Blossoming Flowers at Magical Night.
  I've taken some inspiration by Yup Nguyen's Artwork: https://dribbble.com/shots/11096994-Virtual-Garden.
  Made with Pure CSS & ♥
*/
function Flowers() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const c = setTimeout(() => {
            setLoaded(true);
        }, 1000);

        return () => clearTimeout(c);
    }, []);

    return (
        <div className={`body ${loaded ? "" : "not-loaded"}`}>
            <Link href="/saturday" className="magic-link">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="arrow-icon">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
            </Link>
            <div className="night"></div>
            <div className="flowers">
                <div className="flower flower--1">
                <div className="flower__leafs flower__leafs--1">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>

                </div>
                <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                    <div className="flower__line__leaf flower__line__leaf--5"></div>
                    <div className="flower__line__leaf flower__line__leaf--6"></div>
                </div>
                </div>

                <div className="flower flower--2">
                <div className="flower__leafs flower__leafs--2">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>

                </div>
                <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                </div>
                </div>

                <div className="flower flower--3">
                <div className="flower__leafs flower__leafs--3">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>

                </div>
                <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                </div>
                </div>

                <div className="grow-ans" style={{"--d": "1.2s"} as React.CSSProperties}>
                <div className="flower__g-long">
                    <div className="flower__g-long__top"></div>
                    <div className="flower__g-long__bottom"></div>
                </div>
                </div>

                <div className="growing-grass">
                <div className="flower__grass flower__grass--1">
                    <div className="flower__grass--top"></div>
                    <div className="flower__grass--bottom"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                    <div className="flower__grass__overlay"></div>
                </div>
                </div>

                <div className="growing-grass">
                <div className="flower__grass flower__grass--2">
                    <div className="flower__grass--top"></div>
                    <div className="flower__grass--bottom"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                    <div className="flower__grass__overlay"></div>
                </div>
                </div>

                <div className="grow-ans" style={{"--d": "2.4s"} as React.CSSProperties}>
                <div className="flower__g-right flower__g-right--1">
                    <div className="leaf"></div>
                </div>
                </div>

                <div className="grow-ans" style={{"--d": "2.8s"} as React.CSSProperties}>
                <div className="flower__g-right flower__g-right--2">
                    <div className="leaf"></div>
                </div>
                </div>

                <div className="grow-ans" style={{"--d": "2.8s"} as React.CSSProperties}>
                <div className="flower__g-front">
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
                    <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__line"></div>
                </div>
                </div>

                <div className="grow-ans" style={{"--d": "3.2s"} as React.CSSProperties}>
                <div className="flower__g-fr">
                    <div className="leaf"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
                </div>
                </div>

                <div className="long-g long-g--0">
                <div className="grow-ans" style={{"--d": "3s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "2.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.4s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>

                <div className="long-g long-g--1">
                <div className="grow-ans" style={{"--d": "3.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.8s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>

                <div className="long-g long-g--2">
                <div className="grow-ans" style={{"--d": "4s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.4s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>

                <div className="long-g long-g--3">
                <div className="grow-ans" style={{"--d": "4s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>

                <div className="long-g long-g--4">
                <div className="grow-ans" style={{"--d": "4s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>

                <div className="long-g long-g--5">
                <div className="grow-ans" style={{"--d": "4s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>

                <div className="long-g long-g--6">
                <div className="grow-ans" style={{"--d": "4.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.4s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "4.8s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>

                <div className="long-g long-g--7">
                <div className="grow-ans" style={{"--d": "3s"} as React.CSSProperties}>
                    <div className="leaf leaf--0"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.2s"} as React.CSSProperties}>
                    <div className="leaf leaf--1"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.5s"} as React.CSSProperties}>
                    <div className="leaf leaf--2"></div>
                </div>
                <div className="grow-ans" style={{"--d": "3.6s"} as React.CSSProperties}>
                    <div className="leaf leaf--3"></div>
                </div>
                </div>
            </div>
        </div>
    );
}