"use client";
import { data } from "@/data";
import Link from "next/link";

export default function Classes() {
  return (
    <div>
      <h1>Acunmedya Akademi'ye Hoş Geldiniz</h1>
      <Link className="returnPage" href={"./"}>
        Önceki Sayfa
      </Link>
      <div className="classContainer">
        {data.map((x) => (
          <Link className="link" href={`/class/${x.id}`}>
            <div className="imageClassBox">
              <img src={x.img} alt="" />
            </div>

            <div className="classBox">
              <div className="boxContent">
                <div className="boxContentH6Periot">
                  <h6> {x.name} </h6>
                  <div className="period">{x.period}. Period </div>
                </div>
                <p> {x.teacher} </p>

                <div className="classBoxFooter">
                  <h6>
                    <b>Students :</b> {x.students.length}{" "}
                  </h6>
                  <h6>
                    <b>Classroom :</b> <a>{x.location}</a>
                  </h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
