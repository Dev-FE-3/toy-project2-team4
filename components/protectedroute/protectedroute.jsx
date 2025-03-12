"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/reducers/authReducer";

export default function ProtectedRoute({ children }) {
  const pathname = usePathname(); // 현재 경로 확인
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 페이지는 보호하지 않음
    if (pathname === "/login") return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = JSON.parse(user.displayName);
        userInfo.email = user.email;
        dispatch(loginSuccess(userInfo));
      } else {
        router.replace("/login"); // 로그인 안 되어 있으면 로그인 페이지로 이동
      }
    });

    return () => unsubscribe(); // Cleanup
  }, [pathname, auth, router]);

  return <>{children}</>;
}
