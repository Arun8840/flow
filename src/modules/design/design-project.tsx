"use client"
import React, { useCallback, useState } from "react"
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Connection,
  EdgeChange,
  NodeChange,
  Edge,
} from "@xyflow/react"

const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Project Root" },
    type: "input",
  },
  {
    id: "n2",
    position: { x: 200, y: -50 },
    data: { label: "src" },
    type: "default",
  },
  {
    id: "n3",
    position: { x: 200, y: 50 },
    data: { label: "public" },
    type: "default",
  },
  {
    id: "n4",
    position: { x: 400, y: -100 },
    data: { label: "components" },
    type: "default",
  },
  {
    id: "n5",
    position: { x: 400, y: 0 },
    data: { label: "pages" },
    type: "default",
  },
  {
    id: "n6",
    position: { x: 400, y: 100 },
    data: { label: "App.tsx" },
    type: "output",
  },
  {
    id: "n7",
    position: { x: 600, y: -150 },
    data: { label: "Header.tsx" },
    type: "output",
  },
  {
    id: "n8",
    position: { x: 600, y: -50 },
    data: { label: "Footer.tsx" },
    type: "output",
  },
  {
    id: "n9",
    position: { x: 600, y: 50 },
    data: { label: "Home.tsx" },
    type: "output",
  },
  {
    id: "n10",
    position: { x: 600, y: 150 },
    data: { label: "About.tsx" },
    type: "output",
  },
]

const initialEdges = [
  { id: "e1-2", source: "n1", target: "n2", label: "folder" },
  { id: "e1-3", source: "n1", target: "n3", label: "folder" },
  { id: "e2-4", source: "n2", target: "n4", label: "folder" },
  { id: "e2-5", source: "n2", target: "n5", label: "folder" },
  { id: "e2-6", source: "n2", target: "n6", label: "file" },
  { id: "e4-7", source: "n4", target: "n7", label: "file" },
  { id: "e4-8", source: "n4", target: "n8", label: "file" },
  { id: "e5-9", source: "n5", target: "n9", label: "file" },
  { id: "e5-10", source: "n5", target: "n10", label: "file" },
]

const DesignProject = () => {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes(
        (nodesSnapshot) =>
          applyNodeChanges(changes, nodesSnapshot) as typeof nodesSnapshot
      ),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  )
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  )

  const handleInit = (instance: any) => {
    instance.fitView()
    instance.setViewport({ x: 0, y: 0, zoom: 3 })
  }

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onInit={handleInit}
      />
    </div>
  )
}

export default DesignProject
