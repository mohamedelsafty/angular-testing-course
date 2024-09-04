import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { COURSES } from "../../../../server/db-data";

describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);

    coursesService = TestBed.inject(CoursesService);
  });

  it("should retrieve all courses", () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses).toBeTruthy("No Courses Found");

      expect(courses.length).toBe(12, "Incorrect number courses");
      const course = courses.find((course) => course.id === 12);
      expect(course.titles.description).toBe("Angular Testing Course");

      const req = httpTestingController.expectOne("/api/courses");
      expect(req.request.method).toEqual("GET");
      req.flush({ payload: Object.values(COURSES) });
    });
  });

  it("should retrieve single course by id", () => {
    coursesService.findCourseById(12).subscribe((course) => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);

      const req = httpTestingController.expectOne("/api/courses/12");
      expect(req.request.method).toEqual("GET");
      req.flush(COURSES[12]);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
