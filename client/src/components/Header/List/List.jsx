import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./List.module.css";
import { listData } from "../../../const";

const List = ({ type }) => {
  return (
    <ul className={styles.items}>
      {listData
        .filter((list) => list.type === type)
        .map((list) => (
          <li key={list.id} className={styles.item}>
            {list.listName !== "거리두기 정보" ? (
              <NavLink
                exact
                className={styles.link}
                to={list.link}
                activeClassName={styles.selected}
                title={list.listName}
              >
                <svg
                  className={styles.ico}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={list.viewBox}
                  fill="rgba(0,0,0)"
                  width="20"
                  height="20"
                >
                  <title>{list.listName}</title>
                  <path d={list.path} />
                </svg>
                <span className={styles.text}>{list.listName}</span>
              </NavLink>
            ) : (
              <a
                className={styles.link}
                href="http://ncov.mohw.go.kr/regSocdisBoardView.do?brdId=6&brdGubun=68&ncvContSeq=495"
                title="거리두기 정보"
                target="blank"
              >
                <svg
                  className={styles.ico}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={list.viewBox}
                  fill="rgba(0,0,0)"
                  width="20"
                  height="20"
                >
                  <title>{list.listName}</title>
                  <path d={list.path} />
                </svg>
                <span className={styles.text}>{list.listName}</span>
              </a>
            )}
          </li>
        ))}
    </ul>
  );
};

export default List;
