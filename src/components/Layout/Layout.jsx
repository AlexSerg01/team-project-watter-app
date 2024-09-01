import { Suspense } from "react";

import { Header } from "../Header/Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header></Header>
      <Suspense>{children}</Suspense>
    </div>
  );
}
