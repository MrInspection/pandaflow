/** biome-ignore-all lint/a11y/useValidAnchor: demo link */
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card } from "@/components/ui/card";
import { client } from "@/lib/client";

export const EmptyCategoryState = ({
  categoryName,
}: {
  categoryName: string;
}) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => {
      const res = await client.category.pollCategory.$get({
        name: categoryName,
      });
      return res.json();
    },
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 1000;
    },
  });

  const hasEvents = data?.hasEvents;
  useEffect(() => {
    if (hasEvents) router.refresh();
  }, [hasEvents, router]);

  const codeSnippet = `await fetch('${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`;

  return (
    <Card
      contentClassName="max-w-2xl w-full flex flex-col items-center p-6"
      className="flex flex-1 items-center justify-center"
    >
      <h2 className="font-medium text-gray-950 text-xl/7 tracking-tight">
        Create your fist {categoryName} event
      </h2>
      <p className="mb-8 max-w-md text-pretty text-center text-gray-600 text-sm/6">
        Get started started by sending a request to our tracking API.
      </p>
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
          <div className="flex space-x-2">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-sm">your-first-event.js</span>
        </div>

        <SyntaxHighlighter
          language="javascript"
          style={atomDark}
          customStyle={{
            borderRadius: "0px",
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>
      <div className="mt-8 flex flex-col items-center space-x-2">
        <div className="flex items-center gap-2">
          <div className="size-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-gray-600 text-sm">
            Listening to incoming events...
          </span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">
          Need help? Check out our{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:underline-offset-2"
          >
            documentation
          </a>{" "}
          or{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:underline-offset-2"
          >
            contact support
          </a>
          .
        </p>
      </div>
    </Card>
  );
};
