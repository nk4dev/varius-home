import React from 'react';
import { parseDiff } from 'react-diff-view';
import * as RDV from 'react-diff-view';
import 'react-diff-view/style/index.css';

interface DiffViewerProps {
  diffText: string;
}

export default function DiffViewer({ diffText }: DiffViewerProps) {
  if (!diffText) return <div>No diff available.</div>;

  let files = [] as any[];
  try {
    files = parseDiff(diffText);
  } catch (e) {
    return <div>Failed to parse diff.</div>;
  }
  const Diff: any = (RDV as any).Diff;
  const Hunk: any = (RDV as any).Hunk;

  return (
    <div className="diff-viewer">
      {files.map((file, idx) => (
        <div key={idx} className="mb-6">
          <div className="text-sm text-gray-500 mb-2">{file.from} → {file.to}</div>
          {/* ensure hunks exist before rendering Diff */}
          {file.hunks && file.hunks.length > 0 ? (
            <Diff viewType="unified" hunks={file.hunks} diffType={file.type} oldRevision={file.from} newRevision={file.to}>
              {(hunks: any[]) => hunks.map((hunk: any, i: number) => <Hunk key={i} hunk={hunk} />)}
            </Diff>
          ) : (
            <div className="text-sm text-gray-400">No changes in this file.</div>
          )}
        </div>
      ))}
    </div>
  );
}
