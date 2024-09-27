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
    <div>
      <Link href={`/class`}>Go Class</Link>
      <h1>Öğrenci No - {studentId}</h1>
      <p>
        {student.name} - {student.surname}
      </p>
    </div>
  );
}
