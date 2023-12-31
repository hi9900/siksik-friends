"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { serverAxios } from "@/services/api";
import type { Rank } from "@/types";
import { profileAtom } from "@/store/userAtom";
import styles from "./Rank.module.css";
import RankItem from "./RankItem";

export default function AllRank() {
  const [ranks, setRanks] = useState<Array<Rank>>([]);

  const [, setProfile] = useAtom(profileAtom);
  // atom 초기화
  const resetProfile = () => {
    setProfile({});
  };

  const rankData = async () => {
    try {
      const response = await serverAxios("/user/rank");
      setRanks(response.data);
    } catch (err) {
      console.log("랭킹 조회 에러", err);
      // 더미 데이터
      setRanks([
        {
          user_id: 40,
          nickname: "더미",
          profile: "/default.png",
          odds: "21.4%",
          rank: 1,
          score: 1990,
          level: 3,
        },
        {
          user_id: 35,
          nickname: "qefZ38CJYn",
          profile: "/default.png",
          odds: "4.9%",
          rank: 2,
          score: 1980,
          level: 62,
        },
        {
          user_id: 8,
          nickname: "NdX9g4I6CS",
          profile: "/default.png",
          odds: "4.6%",
          rank: 3,
          score: 1972,
          level: 53,
        },
        {
          user_id: 26,
          nickname: "0sUyCBniU3",
          profile: "/default.png",
          odds: "18.1%",
          rank: 4,
          score: 1954,
          level: 34,
        },
        {
          user_id: 47,
          nickname: "nltbHWNquh",
          profile: "/default.png",
          odds: "21.5%",
          rank: 5,
          score: 1935,
          level: 67,
        },
        {
          user_id: 24,
          nickname: "HYQ39TYEWX",
          profile: "/default.png",
          odds: "27.2%",
          rank: 6,
          score: 1889,
          level: 70,
        },
        {
          user_id: 51,
          nickname: "sA44Cv9NWy",
          profile: "/default.png",
          odds: "7.4%",
          rank: 0,
          score: 1883,
          level: 34,
        },
        {
          user_id: 96,
          nickname: "HA6S2pn516",
          profile: "/default.png",
          odds: "31.7%",
          rank: 0,
          score: 1868,
          level: 90,
        },
        {
          user_id: 961,
          nickname: "HA6S2pn516",
          profile: "/default.png",
          odds: "31.7%",
          rank: 0,
          score: 1868,
          level: 90,
        },
        {
          user_id: 962,
          nickname: "HA6S2pn516",
          profile: "/default.png",
          odds: "31.7%",
          rank: 0,
          score: 1868,
          level: 90,
        },
      ]);
    }
  };

  useEffect(() => {
    rankData();
    resetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.RankArray}>
      <div className={styles.RankFlex}>
        {ranks.map((rank) => (
          <RankItem key={rank.user_id} item={rank} />
        ))}
      </div>
    </div>
  );
}
