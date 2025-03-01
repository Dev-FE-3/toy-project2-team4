"use client"; // 클라이언트 컴포넌트로 지정

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../../utils/firebase"; // Firebase 설정 가져오기
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }) {
  const pathname = usePathname(); // 현재 경로 확인
  const router = useRouter();

  useEffect(() => {
    // 로그인 페이지는 보호하지 않음
    if (pathname === "/login") return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login"); // 로그인 안 되어 있으면 로그인 페이지로 이동
      }
    });

    return () => unsubscribe(); // Cleanup
  }, [pathname, auth, router]);

  return <>{children}</>;
}
