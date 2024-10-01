import React from "react";
import styles from "./comp.module.css";
import { useRouter } from "next/navigation";

function ListRouts() {
  const router = useRouter();
  return <div className={styles.listparent}></div>;
}

export default ListRouts;
