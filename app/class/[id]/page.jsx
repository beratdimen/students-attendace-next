"use client";

import { data } from "@/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ClassDetail() {
  const { id } = useParams();
  const [checked, setChecked] = useState([]);
  const [attendance, setAttendance] = useState(null);

  const classes = data.find((x) => x.id == id);
  console.log("--------" + classes);
  const [students, setStudents] = useState(
    classes.students.map((student) => {
      return {
        ...student,
        isAttended: false,
      };
    })
  );

  const handleClick = (studentId) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          isAttended: !student.isAttended,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };
  console.log(checked);
  return (
    <div className="classDetailContainer">
      <h1>Class - {classes.name}</h1>
      <Link className="returnPage" href={"./"}>
        Önceki Sayfa
      </Link>

      <div className="detailBox">
        {students.map((student) => (
          <div>
            {student.gender === "Male" ? (
              <img src="../img/avatar-male.svg" alt="Male Avatar" />
            ) : (
              <img src="../img/avatar-female.svg" alt="Female Avatar" />
            )}
            <div className="detail" key={student.id}>
              <Link
                className="detailLink"
                href={`/class/${classes.id}/student/${student.id}`}
              >
                <div className="detailContent">
                  {attendance && (
                    <span
                      className={
                        student.isAttended === true ? "here" : "absend"
                      }
                    >
                      {student.isAttended === true ? "Here" : "Absend"}
                    </span>
                  )}
                  <h5>
                    {student.name} {student.surname}
                  </h5>
                  <p>{student.email}</p>
                </div>
                <div className="detailFooter">
                  <p>{student.schoolNo}</p>
                  <p
                    className={`${
                      student.attendance >= 8
                        ? "high"
                        : student.attendance >= 5
                        ? "medium"
                        : "low"
                    }`}
                  >
                    Discontinuity: {student.attendance}
                  </p>
                </div>
              </Link>
              {!attendance && (
                <input
                  type="checkbox"
                  onClick={() => handleClick(student.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {attendance === true ? (
        <button
          onClick={() => {
            setAttendance(false);
            setStudents(
              classes.students.map((student) => {
                return {
                  ...student,
                  isAttended: false,
                };
              })
            );
          }}
        >
          Sıfırla
        </button>
      ) : (
        <button
          onClick={() => {
            setAttendance(true);
            setStudents(
              students.map((student) => {
                return {
                  ...student,
                  attendance:
                    student.isAttended === true
                      ? student.attendance
                      : student.attendance + 1,
                };
              })
            );
          }}
        >
          Yoklama Tamamla
        </button>
      )}
    </div>
  );
}
