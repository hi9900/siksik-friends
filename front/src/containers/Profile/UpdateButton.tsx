"use client";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { serverAxios } from "@/services/api";
import { userAtom } from "@/store/userAtom";
import styles from "./Profile.module.scss";

interface TypeTextType {
  [key: number]: string[];
}

interface Props {
  userPropId?: number;
  isMyShow?: boolean;
}

export default function UpdateButton({ userPropId, isMyShow = false }: Props) {
  const router = useRouter();
  const userId = userPropId;

  // 내 정보
  const [myData] = useAtom(userAtom);
  const myId = myData.user_id;

  /** * 친구인지, 아닌지 상태 확인하기
   * 1. 내가 걔한테 요청을 보냈고, 아직 친구가 아니다.
   * (친구 요청 취소(1) -> 친구 요청(3))
   * 2. 걔가 나에게 요청을 보냈고, 아직 친구가 아니다.
   * (친구 요청 수락(2) -> 친구 삭제(4) / 친구 요청 거절(2) -> 친구 요청(3))
   * 3. 둘 다 요청을 안보냈다
   * (친구 요청(3) -> 친구 요청 취소(1))
   * 4. 친구다
   * (친구 삭제 버튼(4) -> 친구 요청(3))
   */
  const [userType, setUserType] = useState(0);

  const TypeText: TypeTextType = {
    0: [],
    1: ["친구 요청 취소"],
    2: ["친구 요청 수락", "친구 요청 거절"],
    3: ["친구 요청"],
    4: ["친구 삭제"],
  };
  useEffect(() => {
    /** 친구 상태 확인 */
    const isFriend = async () => {
      try {
        const response = await serverAxios(`/user/friend/${userId}`);
        setUserType(response.data.status);
      } catch (err) {
        console.log("친구 요청 에러", err);
      }
    };
    isFriend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  /** 친구 요청 | 삭제 */
  const handleFriend = async (text: string) => {
    if (userType === 3) {
      // 친구 요청
      try {
        await serverAxios.post(`/user/friend/${userId}`);
        setUserType(1);
      } catch (err) {
        console.log("친구 요청 에러", err);
      }
    } else if (userType === 4 || userType === 1) {
      // 친구 삭제, 친구 요청 취소
      try {
        await serverAxios.delete(`/user/friend/${userId}`);
        setUserType(3);
      } catch (err) {
        console.log("친구 삭제 | 취소 에러", err);
      }
    } else if (userType === 2) {
      if (text === "친구 요청 수락") {
        // 친구 수락
        try {
          await serverAxios.put(`/user/friend/${userId}`);
          setUserType(4);
        } catch (err) {
          console.log("친구 수락 에러", err);
        }
      } else if (text === "친구 요청 거절") {
        // 친구 삭제
        try {
          await serverAxios.delete(`/user/friend/${userId}`);
          setUserType(3);
        } catch (err) {
          console.log("친구 거절 에러", err);
        }
      }
    }
  };

  /** 정보 수정 페이지로 이동 */
  const handleUpdate = () => {
    router.replace(`/home/profile/${myId}/update`);
  };
  /** 로그아웃 */
  const handleLogout = async () => {
    try {
      await serverAxios("/auth/sign-out");
      router.push("/");
    } catch (err) {
      console.log("로그아웃 에러", err);
    }
  };

  // 내 프로필
  if (myId === userId) {
    return (
      isMyShow && (
        <>
          <button onClick={handleUpdate} className={styles.button}>
            <span className={styles.buttonText}>정보 수정</span>
          </button>
          <button onClick={handleLogout} className={styles.button}>
            <span className={styles.buttonText}>로그아웃</span>
          </button>
        </>
      )
    );
  }

  // 상대 프로필
  return (
    <>
      {TypeText[userType].map((text) => (
        <button key={text} className={styles.button} onClick={() => handleFriend(text)}>
          <span className={styles.buttonText}>{text}</span>
        </button>
      ))}
    </>
  );
}
