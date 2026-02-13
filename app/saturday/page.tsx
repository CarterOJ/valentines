"use client";

import "@/components/flowers.scss";
import Construction from "@/components/construction";
import { SwitchPageProvider, useSwitchPage } from "@/components/switchPageContext";

export default function SaturdayWrapper() {
  return (
    <SwitchPageProvider targetDate={new Date("2026-02-14T00:00:00")}>
      <Saturday />
    </SwitchPageProvider>
  );
}

export function Saturday() {
  const { switchPage, remainingMs } = useSwitchPage();

  return switchPage ? <Hello /> : <Construction remainingMs={remainingMs} message={"Come back on Saturday to get a hint about the agenda!"} day={"Saturday"} />;
}

function Hello() {
    return (
        <div>Happy Valentine's Day!</div>
    );
}