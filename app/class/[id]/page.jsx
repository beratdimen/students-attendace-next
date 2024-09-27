"use client";

import { data } from "@/data";
import { Search } from "@/helpers/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ClassDetail() {
  const { id } = useParams();
  const [checked, setChecked] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const classes = data.find((x) => x.id == id);
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

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <div className="classDetailContainer">
      <h1>Class - {classes.name}</h1>
      <div className="detailHeader">
        <Link className="returnPage" href={"./"}>
          Önceki Sayfa
        </Link>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search by name "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <Search />
          </button>
        </form>
      </div>

      <div className="detailBox">
        {filteredStudents.map((student) => (
          <div key={student.id}>
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
          className="attencedBtn"
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
          Reset
        </button>
      ) : (
        <button
          className="attencedBtn"
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
          Complete the roll call
        </button>
      )}
    </div>
  );
}
