"use client";
import { ReactNode, useSyncExternalStore } from "react";

const subscribe = (onStoreChange: () => void) => {
  if (typeof window === "undefined") return () => {};
  const handle = requestAnimationFrame(onStoreChange);
  return () => cancelAnimationFrame(handle);
};

const getSnapshot = () => typeof window !== "undefined";
const getServerSnapshot = () => false;

export default function ClientOnly({ children }: { children: ReactNode }) {
  const hasMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!hasMounted) return null;
  return <>{children}</>;
}
