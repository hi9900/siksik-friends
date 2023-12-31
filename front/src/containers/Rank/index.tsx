import AllRank from "./AllRank";
import MyRank from "./MyRank";
import styles from "./Rank.module.css";
import MyProfileCard from "@/components/MyProfileCard";

export default function index() {
  return (
    <>
      <div className={styles.left}>
        <div className={styles.profile}>
          <MyProfileCard />
        </div>
        <div className={styles.RankDiv}>
          <MyRank />
        </div>
      </div>
      <div className={styles.right}>
        <AllRank />
      </div>
    </>
  );
}
