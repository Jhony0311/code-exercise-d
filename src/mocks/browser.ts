import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import { users } from "./users";

const handlers = [
  http.get("/search", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("name");

    if (query === null) {
      return HttpResponse.json(
        {
          status: "error",
          message: "Invalid query params",
        },
        { status: 500 }
      );
    }

    if (query === "") {
      return HttpResponse.json(
        {
          status: "ok",
          results: [],
        },
        {
          status: 404,
        }
      );
    }

    const search = users.filter((user) => user.name.toLowerCase().includes(query)).map((user) => user.name);

    return HttpResponse.json(
      {
        status: "ok",
        results: search,
      },
      {
        status: search.length ? 200 : 404,
      }
    );
  }),
];

export const worker = setupWorker(...handlers);
