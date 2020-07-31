import React, { useState, useEffect } from "react"

import Element from "./element"

const flows = {
  // Flow UUID
  a: {
    // The UUID for the main Flow in the Subflows
    main: "a1",
    // A map of all of the Subflows within a Flow
    subflows: {
      // A map of all Elements
      // and there order in lines within the flow
      a1: {
        lines: [
          // It is a list of lists
          // Think lines in a file for each Subflow
          ["e1", "e2", "e3", "e4"],
          ["e0"],
        ],
        // Each Element is its own object
        elements: {
          // There will always be a Return element
          // even if it is unused
          e0: {
            type: "return",
            position: { x: 75, y: 600 },
            dimensions: { radius: 50 },
            value: {},
            args: [],
          },
          // Need a for Flow inputs
          e1: {
            type: "input",
            position: { x: 75, y: 125 },
            dimensions: { radius: 50 },
            value: {},
          },
          e2: {
            // The type of the Element
            type: "table",
            position: { x: 250, y: 10 },
            dimensions: { width: 200, height: 250 },
            // Each type will have a different value
            // TODO make these in Typescript
            value: {
              name: "Input Table",
              var: "input_table",
              columns: [{ name: "Value", var: "value", type: "Number" }],
              rows: [[5]],
            },
          },
          e3: {
            type: "function",
            position: { x: 600, y: 50 },
            dimensions: { width: 200, height: 250 },
            value: {
              name: "Square",
              var: "square(Number)",
              input: [{ name: "n", type: "Number" }],
              args: ["e2"],
              outputs: [{ type: "Number" }],
              returns: ["e4"],
            },
          },
          e4: {
            type: "table",
            position: { x: 950, y: 10 },
            dimensions: { width: 200, height: 250 },
            value: {
              name: "Output Table",
              var: "output_table",
              columns: [
                {
                  name: "Squared Value",
                  var: "squared_value",
                  type: "Number",
                },
              ],
              rows: [[25]],
            },
          },
        },
      },
    },
  },
  b: null,
  c: null,
}

const Modeler = (props: { path: string; id: string }) => {
  const [flow, setFlow] = useState({
    id: "",
    main: "",
    subflows: {},
  })
  const [subflow, setSubflow] = useState("")

  let date = Date()

  function handleFlow(id: string) {
    setFlow(flows?.[id])
    setSubflow(flows?.[id]?.main)
  }

  function handleSubflow(id: string) {
    setSubflow(id)
  }

  function handleElement(
    location: { line: number; position: number },
    element: any
  ) {
    let elementId =
      flow?.subflows?.[subflow]?.lines?.[location.line]?.[location.position]
    if (flow?.subflows?.[subflow]?.elements?.[elementId]?.value) {
      let newFlow = JSON.parse(JSON.stringify(flow))
      newFlow.subflows[subflow].elements[elementId].value = element
      setFlow(newFlow)
    }
  }

  useEffect(() => {
    if (flow.id === "" || flow.id !== props.id) {
      handleSubflow("")
      handleFlow(props.id)
    }
  }, [])

  return (
    <div>
      <p>
        Modeler {props.path} {props.id} {date}
      </p>
      <svg width="100%" height="2000">
        {flow?.subflows?.[subflow]?.lines &&
          flow?.subflows?.[subflow]?.lines?.map(
            (line: any, lineIndex: number) => {
              // TODO break this into its own Line component
              // This component will keep state for the line
              // such as the midpoints, include when "wrap text" occurs
              return line?.map((elementId: any, positionIndex: number) => {
                let elements = flow?.subflows?.[subflow]?.elements
                return (
                  <Element
                    key={lineIndex.toString() + ":" + positionIndex.toString()}
                    location={{ line: lineIndex, position: positionIndex }}
                    prior={
                      positionIndex === 0
                        ? null
                        : elements?.[line[positionIndex - 1]]
                    }
                    element={elements?.[elementId]}
                    handleElement={handleElement}
                  />
                )
              })
            }
          )}
      </svg>
    </div>
  )
}

export default Modeler
