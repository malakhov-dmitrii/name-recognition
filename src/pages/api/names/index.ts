import { type NextApiRequest, type NextApiResponse } from "next";

// @ts-expect-error no types
import nr from "name-recognition";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const text = (req.body.text as string) || (req.query.text as string);
  const capitalized =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.query.capitalized === "true" || req.body.capitalized === "true" || true;
  const unique =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.query.unique === "true" || req.body.unique === "true" || true;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const recognition = nr.find(text, { capitalized, unique });

  if (req.method === "GET" || req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(200).json({ data: recognition });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
