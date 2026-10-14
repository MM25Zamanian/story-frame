import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { narrativeMDXComponents } from "./mdx-components";

interface MDXRendererProps {
  source: string;
}

export function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote components={narrativeMDXComponents} source={source} />
    </div>
  );
}
