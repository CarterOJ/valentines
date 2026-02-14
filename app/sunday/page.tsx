"use client";

import "@/components/flowers.scss";
import Construction from "@/components/construction";
import { SwitchPageProvider, useSwitchPage } from "@/components/switchPageContext";

export default function SundayWrapper() {
    return (
        <SwitchPageProvider targetDate={new Date("2026-02-15T00:00:00")}>
            <Sunday />
        </SwitchPageProvider>
  );
}

export function Sunday() {
  const { switchPage, remainingMs } = useSwitchPage();

  return switchPage ? <SundayHello /> : <Construction remainingMs={remainingMs} message={"Come back on Friday to unlock the start of Valentine's Day weekend!"} day={"Friday"} />;
}

function SundayHello() {
    return (
        <div>It's Sunday!</div>
    )
}