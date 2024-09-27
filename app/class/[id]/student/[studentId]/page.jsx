"use client";
import { data } from "@/data";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StudentDetail() {
  const { studentId, id } = useParams();
  console.log(studentId, "-", id);

  const classes = data.find((x) => x.id == id);
  const student = classes.students.find((x) => x.id == studentId);

  console.log(classes);
  console.log(student);
  return (
    <div className="studentDetail">
      <h1>Öğrenci No - {studentId}</h1>
      <Link className="returnPage" href={"/class"}>
        Önceki Sayfa
      </Link>

      <div className="contentContainer">
        <div className="studentDetailHeader">
          <h3>{classes.name}</h3>
          {student.gender === "Male" ? (
            <img src="/img/avatar-male.svg" alt="Male Avatar" />
          ) : (
            <img src="/img/avatar-female.svg" alt="Female Avatar" />
          )}
          <ul>
            <li>
              <h6>
                {student.name} {student.surname}
              </h6>
            </li>
            <li>
              <span className="mail">{student.email}</span>
            </li>
          </ul>
        </div>
        <ul className="detailContent">
          <li>
            <span>Gender</span>
            {student.gender.toUpperCase()}
          </li>
          <li>
            <span>Birthday</span>
            {student.birthYear}
          </li>
          <li>
            <span>TCKN</span>
            {student.tckn}
          </li>
          <li>
            <span>School No</span>
            {student.schoolNo}
          </li>
          <li>
            <span>Grade</span>
            {student.grade}
          </li>
          <li>
            <span>Attendance</span>
            {student.attendance}
          </li>
        </ul>
      </div>
    </div>
  );
}
