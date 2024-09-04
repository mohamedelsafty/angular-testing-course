import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable()
export class CoursesService {
  URL = "http://localhost:9000";
  constructor(private http: HttpClient) {}

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.URL}/api/courses/${courseId}`);
  }

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get(`${this.URL}/api/courses`)
      .pipe(map((res) => res["payload"]));
  }

  saveCourse(courseId: number, changes: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(
      `${this.URL}/api/courses/${courseId}`,
      changes
    );
  }

  findLessons(
    courseId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http
      .get(`${this.URL}/api/lessons`, {
        params: new HttpParams()
          .set("courseId", courseId.toString())
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString()),
      })
      .pipe(map((res) => res["payload"]));
  }
}
